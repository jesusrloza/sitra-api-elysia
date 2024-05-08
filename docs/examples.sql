--* API route SQL calls

--* /catalogs
--SELECT DISTINCT FORMAT(FechaInicio, 'yyyy') AS anio FROM Carpeta ORDER BY anio --* /anio
--SELECT * FROM [EJERCICIOS2].[dbo].[AgrupacionDelito] ORDER BY Grupo --* /delito
--SELECT * FROM cat.CatFiscalias ORDER BY Nombre --* /fiscalia
--SELECT * FROM cat.CatMunicipios ORDER BY Nombre --* /municipio

--* /auth
--SELECT [Nombre] ,[Paterno] ,[Materno] ,[Usuario] ,[Contrasena] ,[Estatus] ,[Tipo]
--FROM [EJERCICIOS2].[dbo].[UsuariosSITRA]
--WHERE Usuario = '$user' AND Contrasena = '$pass' AND Estatus = 1

--TODO: sql calls for victima, imputado, carpeta