from fastapi import FastAPI, HTTPException
from database import get_db_connection
from typing import List, Optional
from schemas import User, Product, Price
import mariadb

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from typing import List, Optional

@app.get("/products", response_model=List[Product])
def get_products(page: int = 1, limit: int = 50, search: Optional[str] = None, brand: Optional[str] = None, mass: Optional[int] = None):
    try:
        conn = get_db_connection()
    except mariadb.Error as e:
         raise HTTPException(status_code=500, detail="Database connection not available")

    try:
        offset = (page - 1) * limit
        
        query = "SELECT * FROM products"
        params = []
        conditions = []
        
        if search:
            conditions.append("product_name LIKE %s")
            params.append(f"%{search}%")
        
        if brand:
            conditions.append("brand = %s")
            params.append(brand)
            
        if mass:
            conditions.append("mass = %s")
            params.append(mass)

        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        
        query += " LIMIT %s OFFSET %s"
        params.extend([limit, offset])

        cur = conn.cursor(dictionary=True)
        cur.execute(query, tuple(params))
        result = cur.fetchall()
        cur.close()
        return result
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/prices", response_model=List[Price])
def get_prices(page: int = 1, limit: int = 50, search: Optional[str] = None, seller_id: Optional[int] = None, calendarweek: Optional[int] = None):
    try:
        conn = get_db_connection()
    except mariadb.Error as e:
         raise HTTPException(status_code=500, detail="Database connection not available")

    try:
        offset = (page - 1) * limit
        
        query = "SELECT * FROM prices"
        params = []
        conditions = []
        
        if search:
            # Cast DAN to char for partial search
            conditions.append("CAST(dan AS CHAR) LIKE %s")
            params.append(f"%{search}%")
            
        if seller_id:
            conditions.append("seller_id = %s")
            params.append(seller_id)
            
        if calendarweek:
            conditions.append("calendarweek = %s")
            params.append(calendarweek)

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " LIMIT %s OFFSET %s"
        params.extend([limit, offset])

        cur = conn.cursor(dictionary=True)
        cur.execute(query, tuple(params))
        result = cur.fetchall()
        cur.close()
        return result
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/dashboard/stats")
def get_dashboard_stats():
    try:
        conn = get_db_connection()
    except mariadb.Error as e:
         raise HTTPException(status_code=500, detail="Database connection not available")
    
    try:
        cur = conn.cursor(dictionary=True)
        
        # Total Products
        cur.execute("SELECT COUNT(*) as count FROM products")
        total_products = cur.fetchone()['count']
        
        # Total Prices
        cur.execute("SELECT COUNT(*) as count FROM prices")
        total_prices = cur.fetchone()['count']

        # Products by Group
        cur.execute("SELECT group_name, COUNT(*) as count FROM products GROUP BY group_name")
        products_by_group = cur.fetchall()
        
        cur.close()
        return {
            "total_products": total_products,
            "total_prices": total_prices,
            "products_by_group": products_by_group
        }
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


@app.get("/users")
def get_users():
    try:
        conn = get_db_connection()
    except mariadb.Error as e:
         raise HTTPException(status_code=500, detail="Database connection not available")

    try:
        cur = conn.cursor(dictionary=True)
        cur.execute("SELECT * FROM users")
        result = cur.fetchall()
        cur.close()
        return result
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.post("/users")
def create_user(user: User):
    try:
        conn = get_db_connection()
    except mariadb.Error as e:
         raise HTTPException(status_code=500, detail="Database connection not available")
    
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (name, email) VALUES (%s, %s)",
            (user.name, user.email)
        )
        conn.commit()
        cur.close()
        return {"message": "User created"}
    except mariadb.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
