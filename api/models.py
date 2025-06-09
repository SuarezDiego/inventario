from sqlalchemy import Column, Integer, String, Text
from database import Base


class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(50), nullable=False, unique=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    img = Column(String(255), nullable=True)
    showcase = Column(Integer, nullable=False)
    warehouse = Column(Integer, nullable=False)
    sales = Column(Integer, nullable=False)
    in_delivery = Column(Integer, nullable=False)
