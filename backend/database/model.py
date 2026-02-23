"""
Database Models
File Description: Defines what a “Story” looks like in the database - blueprint for storing data

- Defines database tables.
- Add views column (default=0)
- Add rating support
"""


from sqlalchemy import Column, Integer, String, Text
from .db import Base

class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    culture = Column(String, nullable=True)
    text = Column(Text, nullable=False)