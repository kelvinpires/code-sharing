from django.shortcuts import render, get_object_or_404
from django.views.generic import View, DetailView, UpdateView, CreateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt 
from django.http import JsonResponse
import json
from .models import Codigo

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class NovoCodigo(CreateView):

    def post(self, request):
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {
                    "error": "Dados inválidos.",
                },
                status=400
            )
        codigo = body.get("codigo")
        linguagem = body.get("linguagem")

        if not codigo or not linguagem:
            return JsonResponse(
                {
                    "error": "Codígo e Linguagem são obrigatórias"
                },
                status=400
            )
        
        novo_codigo = Codigo.objects.create(
            codigo=codigo,
            linguagem=linguagem
        )

        return JsonResponse({
            "id_codigo": novo_codigo.id
        })
    
class CodigoExistente(DetailView):

    def get(self, request, id):
        
        codigo = Codigo.objects.filter(id=id).first()
    
        if not codigo:
            return JsonResponse({
                "message": "Id fornecido é inválido ou não encontrado."
            })

        return JsonResponse(
            {
                "id": codigo.id,
                "codigo": codigo.codigo,
                "linguagem": codigo.linguagem
            }
        )

@method_decorator(csrf_exempt, name='dispatch')
class EditarCodigo(UpdateView):

    def post(self, request, id):

        try:
            codigo_existente = Codigo.objects.filter(id=id).first()

            if not codigo_existente:
                return JsonResponse({
                    "message": "Id fornecido é inválido ou não encontrado."
                })
            body = json.loads(request.body)

            codigo = body.get("codigo")
            linguagem = body.get("linguagem")

            if not codigo or not linguagem:
                return JsonResponse(
                    {
                        "error": "Codígo e Linguagem são obrigatórias"
                    },
                    status=400
                )
            
            codigo_existente.codigo = codigo
            codigo_existente.linguagem = linguagem

            codigo_existente.save()


            return JsonResponse({
                "id_codigo": codigo_existente.id
            })


        except json.JSONDecodeError:
            return JsonResponse(
                {
                    "error": "Dados inválidos.",
                },
                status=400
            )

        
        