namespace SalesManagementApp_Core;

public static class Extension
{
    public static async Task<List<T>> ToListFromTasks<T>(this IEnumerable<Task<T>> tasks)
    {
        var response = new List<T>();
        foreach (var task in tasks)
        {
            var result = await task;
            response.Add(result);
            // The next task will start only after the previous one completes
        }

        return response;
    }
}