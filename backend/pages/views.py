from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse,HttpRequest
from django.views.decorators.csrf import csrf_exempt
import uuid
import os
import json, operator
import requests
import sqlite3


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt 
def LoginUser(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    email,password= json.loads(request.body.decode('UTF-8')).values()
    sql_select_query = f"select * from account where email ='{email}'" 

    user=cur.execute(sql_select_query)
    user = cur.fetchone()
 
    # for x in (user):
    #     r.append(user)
    # print(user)

    if user==None:
        return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    # print(user[0])
    r={
        'id':user[0],
        'login':user[1],
        'password':user[2],
        'email':user[3]
    }
    # print(r)
    # return HttpResponse(email)

    # if not bcrypt.checkpw(password.encode(), user[2]):
    #     return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    if not password==user[2]:
        return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    return JsonResponse(r,status=200,safe=False)
@csrf_exempt 
def RegisterUser(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    # con = sqlite3.connect('C:\\Users\\Laptop\\Documents\\GitHub\\siema-wakacje1\\backend\\siema_wakacje_b\\pages\\Project.db')
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))

    cur = con.cursor()
    

    
    username,password,email= json.loads(request.body.decode('UTF-8')).values()
    print("XDD")
    sql_select_query = f"select * from account where email ='{email}'" 
    user=cur.execute(sql_select_query)
    user = cur.fetchone() 
    print(user)
    if not user==None:
        return HttpResponse(status=422)

    # salt=bcrypt.gensalt(rounds=10)
    # hashed=bcrypt.hashpw(password.encode(),salt)
    cur.execute("INSERT INTO account VALUES(?,?,?,?)",
            (str(uuid.uuid4()),username,password,email))
    con.commit()
    return HttpResponse(status=200)

@csrf_exempt 
def ConfirmCards(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    # con = sqlite3.connect('C:\\Users\\Laptop\\Documents\\GitHub\\siema-wakacje1\\backend\\siema_wakacje_b\\pages\\Project.db')
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))

    cur = con.cursor()
    
    userid,data= json.loads(request.body.decode('UTF-8')).values()
    print("XDD")
    print(userid)
    print(str(data))

    # salt=bcrypt.gensalt(rounds=10)
    # hashed=bcrypt.hashpw(password.encode(),salt)
    cur.execute("INSERT INTO Cards VALUES(?,?,?)",
            (str(uuid.uuid4()),userid,str(data)))
    con.commit()
    return HttpResponse(status=200)
@csrf_exempt 
def LoadCards(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)
    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    id,email= json.loads(request.body.decode('UTF-8')).values()
    print(id)

    sql_select_query = f"select * from Cards where accountid ='{id}'" 

    sql_select_query=cur.execute(sql_select_query)
    sql_select_query = cur.fetchall()
    result=[]

 

    if sql_select_query==None:
        return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)
    # print(user[0])
    for i in sql_select_query:
        # text = i.split(',')
        # i=eval(i[0])
        # nazwa dodac XDDDD
        result.append(i[0])
        result.append(i[2])
    # for x in (user):
    #     r.append(user)
    # print(user)
    # print(r)
    # return HttpResponse(email)

    # if not bcrypt.checkpw(password.encode(), user[2]):
    #     return JsonResponse({'message': 'Zły e-mail lub hasło'}, status=404)

    return JsonResponse(result,status=200,safe=False,json_dumps_params={'ensure_ascii': False})

@csrf_exempt 
def Changecards(request):
    if request.method != "POST":
        return HttpResponse(status=404)
    if request.body==None:
        return HttpResponse(status=422)

    con = sqlite3.connect(os.path.join(settings.DB_DIR,'Project.db'))
    cur = con.cursor()

    
    id,name= json.loads(request.body.decode('UTF-8')).values()
    print(id,name)
    # sql_select_query = ("UPDATE list SET name = ? WHERE id=?",(id,name))

    cur.execute("UPDATE Cards SET data = ? WHERE cardsId=?",(name,id))
    con.commit()
    # sql_select_query = f"select cardsId, data from list where cardsId ='{id}'" 
    # sql_select_query=cur.execute(sql_select_query)
    # sql_select_query = cur.fetchone()

    return HttpResponse(status=200)