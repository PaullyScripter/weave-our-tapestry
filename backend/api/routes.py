from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List

from database.db import SessionLocal
from database.models import Story

router = APIRouter(prefix="/api", tags=["api"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class StoryCreate(BaseModel):
    title: str
    culture: Optional[str] = None
    text: str

class StoryOut(BaseModel):
    id: int
    title: str
    culture: Optional[str]
    text: str

    class Config:
        from_attributes = True

@router.get("/stories", response_model=List[StoryOut])
def list_stories(db: Session = Depends(get_db)):
    return db.query(Story).all()

@router.post("/stories", response_model=StoryOut)
def create_story(payload: StoryCreate, db: Session = Depends(get_db)):
    story = Story(
        title=payload.title,
        culture=payload.culture,
        text=payload.text
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return story