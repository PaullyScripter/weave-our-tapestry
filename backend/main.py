from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="Weave Our Tapestry API")

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Welcome to our CS250 Group Project"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(router)