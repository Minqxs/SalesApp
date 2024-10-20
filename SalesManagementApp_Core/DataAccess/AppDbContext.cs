using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.Entities;

namespace SalesManagementApp_Core.DataAccess;

public class AppDbContext : DbContext
{

    public DbSet<Product> Products => this.Set<Product>();

    public DbSet<Sale> Sales => this.Set<Sale>();

    public AppDbContext(DbContextOptions options): base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Sale>()
            .HasMany(s => s.Products)
            .WithMany(s => s.Sales);

        base.OnModelCreating(builder);

    }
}