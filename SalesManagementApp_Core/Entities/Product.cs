namespace SalesManagementApp_Core.Entities;

public class Product
{
    public string Id { get; set; }

    public string Description { get; set; }

    public double Price { get; set; }

    public string? Image { get; set; }

    public bool IsDeleted { get; set; }

    public List<Sale> Sales { get; set; } = new List<Sale>();
}