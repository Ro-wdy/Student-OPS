import json
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Student


def to_dict(s):
    return {
        "id": s.id,
        "name": s.name,
        "email": s.email,
        "age": s.age,
        "course": s.course,
        "created_at": s.created_at.isoformat(),
    }


@csrf_exempt
def student_list(request):
    if request.method == "GET":
        students = Student.objects.all().order_by("-created_at")
        return JsonResponse([to_dict(s) for s in students], safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            student = Student.objects.create(
                name=data["name"],
                email=data["email"],
                age=int(data["age"]),
                course=data["course"],
            )
        except (KeyError, ValueError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid or missing fields"}, status=400)
        except IntegrityError:
            return JsonResponse({"error": "A student with this email already exists"}, status=400)
        return JsonResponse(to_dict(student), status=201)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == "GET":
        return JsonResponse(to_dict(student))

    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            student.name = data["name"]
            student.email = data["email"]
            student.age = int(data["age"])
            student.course = data["course"]
            student.save()
        except (KeyError, ValueError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid or missing fields"}, status=400)
        except IntegrityError:
            return JsonResponse({"error": "A student with this email already exists"}, status=400)
        return JsonResponse(to_dict(student))

    if request.method == "DELETE":
        student.delete()
        return HttpResponse(status=204)

    return JsonResponse({"error": "Method not allowed"}, status=405)