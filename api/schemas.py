from pydantic import BaseModel
from typing import Optional


class ItemCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    img: Optional[str] = None
    showcase: int
    warehouse: int
    sales: int
    in_delivery: int


class ItemResponse(BaseModel):
    id: int
    code: str
    name: str
    description: Optional[str] = None
    img: Optional[str] = None
    showcase: int
    warehouse: int
    sales: int
    in_delivery: int

    class Config:
        orm_mode = True


class ItemUpdate(BaseModel):
    description: Optional[str] = None
    img: Optional[str] = None
    showcase: int
    warehouse: int
    sales: int
    in_delivery: int
