namespace SalesManagementApp_Core.Entities;

public class Sale
{
    public int Id { get; set; }
    public List<Product> Products { get; set; } = new List<Product>();

    public DateTimeOffset SaleDate { get; set; }

    public double SalePrice => this.Products.Sum(p => p.Price);

    public double Quantity => this.Products.Count;

    public bool IsDeleted { get; set; }
}