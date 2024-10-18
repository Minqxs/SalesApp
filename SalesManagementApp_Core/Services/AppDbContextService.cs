using Microsoft.EntityFrameworkCore;
using SalesManagementApp_Core.DataAccess;

namespace SalesManagementApp_Core.Services;

public class AppDbContextService
{
    private readonly IDbContextFactory<AppDbContext> _dbContext;

    public AppDbContextService(IDbContextFactory<AppDbContext> dbContext)
    {
        _dbContext = dbContext;
    }

    public AppDbContext CreateAndVerifyContext()
    {
        var context = _dbContext.CreateDbContext();
        context.Database.EnsureCreated();

        return context;
    }
}