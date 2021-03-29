#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/SGM.WebApp/SGM.WebApp.csproj", "src/SGM.WebApp/"]
RUN dotnet restore "src/SGM.WebApp/SGM.WebApp.csproj"

COPY . .
WORKDIR "/src/src/SGM.WebApp"
RUN dotnet build "SGM.WebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SGM.WebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SGM.WebApp.dll"]