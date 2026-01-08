from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class Price(BaseModel):
    price_id: int
    dan: int
    amount: int
    price: Optional[float] = None
    app_price: Optional[float] = None
    bonus_price: Optional[float] = None
    bonus_points: Optional[int] = None
    bonus_percent: Optional[int] = None
    off_price: Optional[float] = None
    off_percent: Optional[int] = None
    adv_id: Optional[int] = None
    page: Optional[int] = None
    position: Optional[int] = None
    calendarweek: Optional[int] = None
    attrib: Optional[str] = None
    seller_id: int

class Product(BaseModel):
    dan: int
    brand: str
    product_name: str
    mass: int
    manufacturer: str
    group_name: str
    gtin: Optional[str] = None
    base_price_factor: float
    base_price_unit: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    last_promotion_week: Optional[int] = None

class User(BaseModel):
    name: str
    email: str
