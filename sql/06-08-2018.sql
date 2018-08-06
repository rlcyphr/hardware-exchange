--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

-- Started on 2018-08-06 18:58:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2830 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 200 (class 1259 OID 16421)
-- Name: component_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.component_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.component_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16402)
-- Name: component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component (
    "componentID" bigint DEFAULT nextval('public.component_seq'::regclass) NOT NULL,
    "userID" bigint NOT NULL,
    condition text NOT NULL,
    "imagePath" text,
    description text NOT NULL,
    title text NOT NULL,
    "componentTypeID" bigint NOT NULL
);


ALTER TABLE public.component OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16423)
-- Name: componentType_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."componentType_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."componentType_seq" OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16410)
-- Name: componentType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."componentType" (
    "componentTypeID" bigint DEFAULT nextval('public."componentType_seq"'::regclass) NOT NULL,
    "componentTypeDescription" text NOT NULL
);


ALTER TABLE public."componentType" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16418)
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_seq OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "userID" bigint DEFAULT nextval('public.user_seq'::regclass) NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "dateCreated" bigint NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 2818 (class 0 OID 16402)
-- Dependencies: 197
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2819 (class 0 OID 16410)
-- Dependencies: 198
-- Data for Name: componentType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."componentType" VALUES (1, 'CPU');
INSERT INTO public."componentType" VALUES (2, 'Motherboard');
INSERT INTO public."componentType" VALUES (3, 'RAM');
INSERT INTO public."componentType" VALUES (4, 'Case');
INSERT INTO public."componentType" VALUES (5, 'Cooler');
INSERT INTO public."componentType" VALUES (6, 'Graphics Card');
INSERT INTO public."componentType" VALUES (7, 'Monitor
');
INSERT INTO public."componentType" VALUES (8, 'Keyboard
');
INSERT INTO public."componentType" VALUES (9, 'PSU');
INSERT INTO public."componentType" VALUES (10, 'Hard Drive');
INSERT INTO public."componentType" VALUES (11, 'SSD');


--
-- TOC entry 2817 (class 0 OID 16394)
-- Dependencies: 196
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2831 (class 0 OID 0)
-- Dependencies: 201
-- Name: componentType_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."componentType_seq"', 11, true);


--
-- TOC entry 2832 (class 0 OID 0)
-- Dependencies: 200
-- Name: component_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.component_seq', 1, false);


--
-- TOC entry 2833 (class 0 OID 0)
-- Dependencies: 199
-- Name: user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_seq', 1, false);


--
-- TOC entry 2693 (class 2606 OID 16417)
-- Name: componentType componentType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."componentType"
    ADD CONSTRAINT "componentType_pkey" PRIMARY KEY ("componentTypeID");


--
-- TOC entry 2691 (class 2606 OID 16409)
-- Name: component component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY ("componentID");


--
-- TOC entry 2689 (class 2606 OID 16401)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");


--
-- TOC entry 2695 (class 2606 OID 16432)
-- Name: component componentType_componentTypeID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT "componentType_componentTypeID_fk" FOREIGN KEY ("componentTypeID") REFERENCES public."componentType"("componentTypeID");


--
-- TOC entry 2694 (class 2606 OID 16427)
-- Name: component user_userID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT "user_userID_fk" FOREIGN KEY ("userID") REFERENCES public."user"("userID");


-- Completed on 2018-08-06 18:58:56

--
-- PostgreSQL database dump complete
--

