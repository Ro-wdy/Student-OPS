from django.db import models

# Student record stored in the database
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # no two students can share an email
    age = models.IntegerField()
    course = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)  # set automatically on creation

    def __str__(self):
        return self.name
