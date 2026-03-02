"""
API Routes Layer(HTTP Endpoints)
File Desription: Defines URLs/endpoints for frontend to call

Objectives:
- Define HTTP endpoints
- Validate request inputs
- Call DB and feature logic
- Return JSON responses
- Add GET /api/stories/{id}
- Improve error handling
- Add /api/search endpoint
- Add sorting parameters
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List

from database.db import SessionLocal
from database.model import Story

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
    views: int

    class Config:
        from_attributes = True

@router.get("/stories", response_model=List[StoryOut])
def list_stories(db: Session = Depends(get_db)):
    return db.query(Story).all()


#receives story_id from URL + queries DB for ID
@router.get("/stories/{story_id}", response_model = StoryOut)
def get_story(story_id: int, db: Session = Depends(get_db)):
    story = db.query(Story).filter(Story.id == story.id).first()
    if story is None:
        raise HTTPException(status_code = 404, detail = "Story not found")
    return story

@router.post("/stories/{story_id}/views")
def increment_views(story_id: int, db:Session = Depends(get_db)):
    story = db.query(Story).filter(Story.id == story_id).first()
    if story is None:
        raise HTTPException(status_code = 404, detail = "Story not found")
    #automatic increment when reading
    story.views = (story.views or 0)  + 1
    db.commit()
    db.refresh(story)
    return {"id" : story.id, "views": story.views}
        

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