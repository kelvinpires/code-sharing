from django.urls import path
from . import views

app_name = "code"

urlpatterns = [
    path("new/", views.NovoCodigo.as_view(), name="novo_codigo"),
    path("<uuid:id>/", views.CodigoExistente.as_view(), name="codigo_existente"),
    path("edit/<uuid:id>/", views.EditarCodigo.as_view(), name="editar_codigo")
]
