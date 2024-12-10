FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SalesManagementApp_Web/SalesManagementApp_Web.csproj", "SalesManagementApp_Web/"]
RUN dotnet restore "SalesManagementApp_Web/SalesManagementApp_Web.csproj"
COPY . .
WORKDIR "/src/SalesManagementApp_Web"
RUN dotnet build "SalesManagementApp_Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SalesManagementApp_Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SalesManagementApp_Web.dll"]
