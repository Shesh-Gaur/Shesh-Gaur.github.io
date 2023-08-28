export class Vector2D
{
    constructor(X,Y)
    {
        this.x = X;
        this.y = Y;
    }

    get Length()
    {     
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    } 

    Add(vector)
    {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    Sub(vector)
    {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    Mult(scalar)
    {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    Div(scalar)
    {
        return new Vector2D(this.x / scalar, this.y / scalar);
    }

    DotProduct(vector)
    {
        return (this.x * vector.x) + (this.y * vector.y);
    }

    Normalize()
    {
        return this.div(this.Length);
    }
}