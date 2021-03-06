PGDMP     +                    v           hardware-exchange    10.4    10.4     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    16393    hardware-exchange    DATABASE     �   CREATE DATABASE "hardware-exchange" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United Kingdom.1252' LC_CTYPE = 'English_United Kingdom.1252';
 #   DROP DATABASE "hardware-exchange";
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16421    component_seq    SEQUENCE     v   CREATE SEQUENCE public.component_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.component_seq;
       public       postgres    false    3            �            1259    16402 	   component    TABLE     '  CREATE TABLE public.component (
    "componentID" bigint DEFAULT nextval('public.component_seq'::regclass) NOT NULL,
    "userID" bigint NOT NULL,
    condition text NOT NULL,
    "imagePath" text,
    description text NOT NULL,
    title text NOT NULL,
    "componentTypeID" bigint NOT NULL
);
    DROP TABLE public.component;
       public         postgres    false    200    3            �            1259    16423    componentType_seq    SEQUENCE     |   CREATE SEQUENCE public."componentType_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."componentType_seq";
       public       postgres    false    3            �            1259    16410    componentType    TABLE     �   CREATE TABLE public."componentType" (
    "componentTypeID" bigint DEFAULT nextval('public."componentType_seq"'::regclass) NOT NULL,
    "componentTypeDescription" text NOT NULL
);
 #   DROP TABLE public."componentType";
       public         postgres    false    201    3            �            1259    16418    user_seq    SEQUENCE     q   CREATE SEQUENCE public.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.user_seq;
       public       postgres    false    3            �            1259    16394    user    TABLE     �   CREATE TABLE public."user" (
    "userID" bigint DEFAULT nextval('public.user_seq'::regclass) NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "dateCreated" bigint NOT NULL,
    username text NOT NULL,
    cookie text
);
    DROP TABLE public."user";
       public         postgres    false    199    3                      0    16402 	   component 
   TABLE DATA               {   COPY public.component ("componentID", "userID", condition, "imagePath", description, title, "componentTypeID") FROM stdin;
    public       postgres    false    197   �                 0    16410    componentType 
   TABLE DATA               X   COPY public."componentType" ("componentTypeID", "componentTypeDescription") FROM stdin;
    public       postgres    false    198   �                 0    16394    user 
   TABLE DATA               b   COPY public."user" ("userID", email, "passwordHash", "dateCreated", username, cookie) FROM stdin;
    public       postgres    false    196   4                  0    0    componentType_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."componentType_seq"', 11, true);
            public       postgres    false    201                       0    0    component_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.component_seq', 1, false);
            public       postgres    false    200                       0    0    user_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('public.user_seq', 26, true);
            public       postgres    false    199            �
           2606    16417     componentType componentType_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."componentType"
    ADD CONSTRAINT "componentType_pkey" PRIMARY KEY ("componentTypeID");
 N   ALTER TABLE ONLY public."componentType" DROP CONSTRAINT "componentType_pkey";
       public         postgres    false    198            �
           2606    16409    component component_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY ("componentID");
 B   ALTER TABLE ONLY public.component DROP CONSTRAINT component_pkey;
       public         postgres    false    197            �
           2606    16401    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         postgres    false    196            �
           2606    16432 *   component componentType_componentTypeID_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.component
    ADD CONSTRAINT "componentType_componentTypeID_fk" FOREIGN KEY ("componentTypeID") REFERENCES public."componentType"("componentTypeID");
 V   ALTER TABLE ONLY public.component DROP CONSTRAINT "componentType_componentTypeID_fk";
       public       postgres    false    198    2693    197            �
           2606    16427    component user_userID_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.component
    ADD CONSTRAINT "user_userID_fk" FOREIGN KEY ("userID") REFERENCES public."user"("userID");
 D   ALTER TABLE ONLY public.component DROP CONSTRAINT "user_userID_fk";
       public       postgres    false    196    197    2689                  x������ � �         r   x�3�t�2���/�H-J�O,J�2�r��2�tN,N�2�t���I-�2�t/J,��L.Vp�2���,�/�����N�kr,9�C�8=�|��̲T.CC��`�=... xw ,         �  x�U���@�k}��#3lC�,*�"�"�4Ȏ((;Obb�)f��_�EA�(��_�g?��$~X��ه@��1��2�h1��.厇��6վ�r"L����QY��9cf�&)1F�	��>���[^����6 ��H��s-bc�6+�E����]��)���+���ڲ�/��4�1���3��/���|�b�1űh����l�mFq��9^5θje{�)��q�d`
C�����Yз��S�-��e��|��v���?,;�8��@�ʊ����Bf�s����$H�9H2������!����[#.�v��"j!�9a�(d��~d㣍��a�I˖!�[�2F��*��A�7��?E��������:t6�ůǮfX��r���n\|�$ҕD�D!8b$��)��0�@Ľ%&��>�]^W�9����T��F�tB� �7	�L��Xd��vߑ+Ns�&����������b=
f%�2=��૙9t�)vlU,(�
jI�V��9ј����7Z%[��C�=�`Zw�9��PO�%J���@'��u��<z7�.h��Y��,��-�(*pK��}�e#�,˗��C�S�5-B-X	��!�>���5fܚP��������%�a���&�Ut���H@��V��ƅ�h�)=u2���ҵ��LYS,\��ʦ0G�{��0~�x�P��ZX�O������a��<;���n���!���0ʧv��I�ڣY���7�����n���{_3�݂2�h�t��/Q�m�%�b1�~��Z����3߫�A���U>��x��e��M������M����WE�B�'��Vbw�E�����b�6-�����Kʷ`����|>d���n�$�ؼQZ[v�T	�:!N�.!�ۘzs��&[ˉ�m�q�{��E�U�ι��j�R�T�V�XE��#Q�)��}��N�*|�A��,�����v|J\����T�n*�K��8����  6w�ZD�.�A��a:�`>���=��     