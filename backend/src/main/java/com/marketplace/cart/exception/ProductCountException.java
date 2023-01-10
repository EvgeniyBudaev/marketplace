package com.marketplace.cart.exception;

public class ProductCountException extends RuntimeException{
    public ProductCountException(String message){
        super(message);
    }
    public ProductCountException(){
        super("Недопустимое количество товара");
    }
}
