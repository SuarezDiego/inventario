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

"""
Endpoint para crear un nuevo ítem
"""


@router.post(
    "/",
    response_model=schemas.ItemResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_item(
    item: schemas.ItemCreate,
    db: Session = Depends(database.get_db)
):
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


"""
Endpoint para listar todos los ítems con paginación
"""


@router.get("/", response_model=List[schemas.ItemResponse])
def listar_items(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    return db.query(models.Item).offset(skip).limit(limit).all()


"""
Endpoint para obtener un ítem por su ID
"""


@router.get("/{id}", response_model=schemas.ItemResponse)
def obtener_item(id: int, db: Session = Depends(database.get_db)):
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    return item


"""
Endpoint para actualizar un ítem existente
"""


@router.patch("/{id}", response_model=schemas.ItemResponse)
def actualizar_item(
    id: int,
    item_update: schemas.ItemUpdate,
    db: Session = Depends(database.get_db)
):

    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    for campo, valor in item_update.model_dump(exclude_unset=True).items():
        setattr(item, campo, valor)
    db.commit()
    db.refresh(item)
    return item


"""
Endpoint para eliminar un ítem por su ID
"""


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_item(id: int, db: Session = Depends(database.get_db)):
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Ítem no encontrado")
    db.delete(item)
    db.commit()
    return


"""
Endpoint para crear múltiples ítems en una sola solicitud
"""


@router.post(
    "/bulk",
    response_model=List[schemas.ItemResponse],
    status_code=status.HTTP_201_CREATED
)
def crear_items_masivos(
    items: List[schemas.ItemCreate],
    db: Session = Depends(database.get_db)
):
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
