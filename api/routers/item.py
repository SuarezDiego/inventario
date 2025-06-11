from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
import models
import schemas
import database

# Configuración del router para los endpoints relacionados con ítems
router = APIRouter(
    prefix="/items",
    tags=["items"]
)


@router.post(
    "/",
    response_model=schemas.ItemResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_item(
    item: schemas.ItemCreate,
    db: Session = Depends(database.get_db)
):
    """
    Crea un nuevo ítem en la base de datos.
    Args:
        item (schemas.ItemCreate): Datos del ítem a crear.
        db (Session): Sesión de la base de datos.
    Returns:
        schemas.ItemResponse: El ítem creado.
    """
    db_item = db.query(models.Item).filter(
        models.Item.code == item.code).first()
    if db_item:
        raise HTTPException(
            status_code=400, detail="El código del ítem ya está registrado"
        )
    nuevo_item = models.Item(**item.dict())
    db.add(nuevo_item)
    db.commit()
    db.refresh(nuevo_item)
    return nuevo_item


@router.get("/", response_model=List[schemas.ItemResponse])
def listar_items(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    """
    Lista todos los ítems con paginación.
    Args:
        skip (int): Número de ítems a omitir (paginación).
        limit (int): Número máximo de ítems a retornar.
        db (Session): Sesión de la base de datos.
    Returns:
        List[schemas.ItemResponse]: Lista de ítems.
    """
    return db.query(models.Item).offset(skip).limit(limit).all()


@router.get("/{id}", response_model=schemas.ItemResponse)
def obtener_item(id: int, db: Session = Depends(database.get_db)):
    """
    Obtiene un ítem por su ID.
    Args:
        id (int): ID del ítem a obtener.
        db (Session): Sesión de la base de datos.
    Returns:
        schemas.ItemResponse: El ítem encontrado.
    """
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    return item


@router.patch("/{id}", response_model=schemas.ItemResponse)
def actualizar_item(
    id: int,
    item_update: schemas.ItemUpdate,
    db: Session = Depends(database.get_db)
):
    """
    Actualiza un ítem existente por su ID.
    Args:
        id (int): ID del ítem a actualizar.
        item_update (schemas.ItemUpdate): Datos a actualizar.
        db (Session): Sesión de la base de datos.
    Returns:
        schemas.ItemResponse: El ítem actualizado.
    """
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    for campo, valor in item_update.model_dump(exclude_unset=True).items():
        setattr(item, campo, valor)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_item(id: int, db: Session = Depends(database.get_db)):
    """
    Elimina un ítem por su ID.
    Args:
        id (int): ID del ítem a eliminar.
        db (Session): Sesión de la base de datos.
    """
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    db.delete(item)
    db.commit()
    return


@router.post(
    "/bulk",
    response_model=List[schemas.ItemResponse],
    status_code=status.HTTP_201_CREATED
)
def crear_items_masivos(
    items: List[schemas.ItemCreate],
    db: Session = Depends(database.get_db)
):
    """
    Crea múltiples ítems en la base de datos.
    Args:
        items (List[schemas.ItemCreate]): Lista de ítems a crear.
        db (Session): Sesión de la base de datos.
    Returns:
        List[schemas.ItemResponse]: Lista de ítems creados.
    """
    items_creados = []
    errores = []

    for item in items:
        try:
            nuevo_item = models.Item(**item.dict())
            db.add(nuevo_item)
            db.commit()
            db.refresh(nuevo_item)
            items_creados.append(nuevo_item)
        except IntegrityError:
            db.rollback()
            errores.append(f"El código {item.code} ya está registrado")

    if errores:
        raise HTTPException(
            status_code=400,
            detail={"message": "Algunos ítems no se pudieron registrar",
                    "errors": errores}
        )

    return items_creados
