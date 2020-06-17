clc
clear
q=input("Dis kuvveti giriniz")
L=input("Kirisin boyunu giriniz")
a=input("Dis kuvvetin A noktasından ne kadar uzaga etki edecegini giriniz")
b=L-a;
Ax=0;
Ay=q*(b/L);
By=(a/L)*q;
fprintf("A mesnetinin X reaksiyonu: "+Ax+"/n")
fprintf("A mesnetinin y reaksiyonu: "+Ay)
fprintf("B mesnetinin Y reaksiyonu: "+By)