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
        return this.Div(this.Length);
    }
}

export function interpolate(color1, color2, percent) {
    // Convert the hex colors to RGB values
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
  
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
  
    // Interpolate the RGB values
    const r = Math.round(r1 + (r2 - r1) * percent);
    const g = Math.round(g1 + (g2 - g1) * percent);
    const b = Math.round(b1 + (b2 - b1) * percent);
  
    // Convert the interpolated RGB values back to a hex color
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }