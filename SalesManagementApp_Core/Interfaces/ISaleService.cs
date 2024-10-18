using SalesManagementApp_Core.Entities;

namespace SalesManagementApp_Core.Interfaces;

public interface ISaleService
{
    public IQueryable<Sale> GetSales ();

    public Task<Sale> CreateSale();

    public Task<Sale> EditSale ();

    public Task<Sale> DeleteSale ();
}