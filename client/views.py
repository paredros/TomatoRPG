from django.shortcuts import render

# Create your views here.
def angularBase (request):
    return render(request, 'ng-base.html')