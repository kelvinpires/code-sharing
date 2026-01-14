from django.db import models
import uuid

# Create your models here.
class Codigo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,  editable=False)
    codigo = models.TextField()
    linguagem = models.CharField(max_length=20)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.codigo