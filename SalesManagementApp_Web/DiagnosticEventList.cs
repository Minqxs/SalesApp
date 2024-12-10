using System.Diagnostics;
using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;

public class DiagnosticEventListener(ILogger<DiagnosticEventListener> logger) : ExecutionDiagnosticEventListener
{
    public override IDisposable ExecuteRequest(IRequestContext context)
    {
        Activity.Current?
            .SetTag("graphql.operation_name", context.Request.OperationName ?? "Unknown");
        return new ExecuteRequestDispose();
    }

    public override void RequestError(
        IRequestContext context,
        Exception exception)
    {
        Activity.Current?
            .SetTag("graphql.error", "true");
        logger.LogError(
            exception,
            "GraphQL Query Failed, Message: {}, Operation: {}",
            exception.Message,
            context.Operation?.Name);
    }

    private class ExecuteRequestDispose : IDisposable
    {
        public void Dispose()
        {
        }
    }
}