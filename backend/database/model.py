from sqlalchemy import Column, Integer, String, Text
from .db import Base

class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    culture = Column(String, nullable=True)
    text = Column(Text, nullable=False)