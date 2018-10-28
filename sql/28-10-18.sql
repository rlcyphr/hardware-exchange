
--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: component_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.component_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.component_seq OWNER TO jtmlvbxebrseae;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16396)
-- Name: component; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.component (
    "componentID" bigint DEFAULT nextval('public.component_seq'::regclass) NOT NULL,
    "userID" bigint NOT NULL,
    "imagePath" text,
    description text NOT NULL,
    title text NOT NULL,
    "componentTypeID" bigint NOT NULL
);


ALTER TABLE public.component OWNER TO jtmlvbxebrseae;

--
-- TOC entry 198 (class 1259 OID 16403)
-- Name: componentType_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."componentType_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."componentType_seq" OWNER TO jtmlvbxebrseae;

--
-- TOC entry 199 (class 1259 OID 16405)
-- Name: componentType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."componentType" (
    "componentTypeID" bigint DEFAULT nextval('public."componentType_seq"'::regclass) NOT NULL,
    "componentTypeDescription" text NOT NULL
);


ALTER TABLE public."componentType" OWNER TO jtmlvbxebrseae;

--
-- TOC entry 200 (class 1259 OID 16412)
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_seq OWNER TO jtmlvbxebrseae;

--
-- TOC entry 201 (class 1259 OID 16414)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "userID" bigint DEFAULT nextval('public.user_seq'::regclass) NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "dateCreated" bigint NOT NULL,
    username text NOT NULL,
    cookie text
);


ALTER TABLE public."user" OWNER TO jtmlvbxebrseae;

--
-- TOC entry 2818 (class 0 OID 16396)
-- Dependencies: 197
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.component VALUES (1, 26, '1', 'fgfd', 'gfdg', 1);
INSERT INTO public.component VALUES (2, 26, '1', 'c', 'b', 1);
INSERT INTO public.component VALUES (3, 26, '1', 'jldkfjldskjfds', 'graphics card', 1);
INSERT INTO public.component VALUES (4, 26, '1', 'dfdsf', 'dfd', 1);
INSERT INTO public.component VALUES (5, 26, '1', 'ddfdf', 'ddd', 1);
INSERT INTO public.component VALUES (6, 26, '1', 'dsfds', 'fdsf', 1);
INSERT INTO public.component VALUES (7, 26, '1', 'fgfd', 'rgf', 1);
INSERT INTO public.component VALUES (8, 26, '1', 'dsfds', 'fdsfd', 1);
INSERT INTO public.component VALUES (9, 26, '1', 'dfdsf', 'fdds', 2);
INSERT INTO public.component VALUES (10, 26, '1', 'djfsdjflsdjf', 'fdsfdlsjf', 3);
INSERT INTO public.component VALUES (11, 26, '1', 'this is a description', 'CPU', 3);
INSERT INTO public.component VALUES (12, 26, '1', 'description', 'title', 3);
INSERT INTO public.component VALUES (13, 26, '1', 'gdfgfd', 'fgfd', 2);
INSERT INTO public.component VALUES (14, 26, '1', 'CPU gfdgfg', 'CPU', 1);
INSERT INTO public.component VALUES (15, 26, '1', 'fdgf', 'fdgfg', 1);
INSERT INTO public.component VALUES (16, 26, '1', 'test3', 'test2', 1);
INSERT INTO public.component VALUES (17, 26, '1', 'ghgfhf', 'ghgfh', 1);
INSERT INTO public.component VALUES (18, 26, '1', '', 'fgfdg', 1);
INSERT INTO public.component VALUES (19, 27, '1', 'this is a test of adding a new item to the site', 'first item test', 2);
INSERT INTO public.component VALUES (20, 26, '1', 'ffdglfd', 'new title', 1);
INSERT INTO public.component VALUES (21, 26, '1', 'djflkdkfds', 'sjlksd', 3);
INSERT INTO public.component VALUES (22, 26, '1', 'new description', 'new title', 2);
INSERT INTO public.component VALUES (23, 26, '1', 'dfjdslfjdfdfjdsfdsf
fdgds
fds
fd
f
dsf
ds
fds
f
ds
ds', 'gegdfdf', 1);
INSERT INTO public.component VALUES (24, 26, '1', 'this is a longer description<br/>so it''ll take up more space than usual<br/>', 'a new item to show ', 1);
INSERT INTO public.component VALUES (25, 26, '1', 'this is a longer description, this might contain all of the details of the thing that is listed here. It also might contain spaces and such. Testing the truncating function of the repeater.', 'more stuff', 1);
INSERT INTO public.component VALUES (26, 35, '1', 'dflsdflk', 'jfdskj', 1);
INSERT INTO public.component VALUES (27, 26, '1', 'a new thing', 'a new thing', 1);
INSERT INTO public.component VALUES (28, 26, '1', 'This is an item added on mobile.', 'new item', 2);


--
-- TOC entry 2820 (class 0 OID 16405)
-- Dependencies: 199
-- Data for Name: componentType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."componentType" VALUES (2, 'GPU');
INSERT INTO public."componentType" VALUES (4, 'Case
');
INSERT INTO public."componentType" VALUES (3, 'RAM');
INSERT INTO public."componentType" VALUES (6, 'PSU');
INSERT INTO public."componentType" VALUES (5, 'Motherboard');
INSERT INTO public."componentType" VALUES (8, 'SSD');
INSERT INTO public."componentType" VALUES (7, 'HDD');
INSERT INTO public."componentType" VALUES (9, 'Monitor');
INSERT INTO public."componentType" VALUES (1, 'CPU');


--
-- TOC entry 2822 (class 0 OID 16414)
-- Dependencies: 201
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (16, 'fdgfd@fgf.com', '$2b$10$R0cMTSdITlyuQhxRQgf/z.kKi9USjsbusPsMl0ehBg9B2UJFiNXj6', 1534626951282, 'gfdgdf', NULL);
INSERT INTO public."user" VALUES (17, 'a@b.com', '$2b$10$TELu.dzugU32XWbogOHYuu41sNr4m3bbwyOKuG8i7Bc3rfgqOLv72', 1534627156886, 'gfdgdf', NULL);
INSERT INTO public."user" VALUES (18, 'abc@def.com', '$2b$10$.pnvDv96oUoufVRHGH/87uzDWboxCIgCrf3fuWzAvI98a.upRmOk6', 1534627648155, 'dsad', NULL);
INSERT INTO public."user" VALUES (19, 'dxvsd@fd.com', '$2b$10$NlpdgYpIkIxvKrzU01BWcepwQ0V.Vy4.sRfDXF2.kJ3jjqywmdb9.', 1534632891365, 'fdsf', NULL);
INSERT INTO public."user" VALUES (20, 'abcd@abcd.com', '$2b$10$f.YB9SKYzr0tChkWehuC2e65hmU7gUT2EFOTIhg1pv60mHDZzfZ82', 1534634463041, 'abcd', NULL);
INSERT INTO public."user" VALUES (21, 'abc@defg.com', '$2b$10$Glc88axDteWGyRBFzwt67.9.CZS4TtmOZcc30iAE5Sq0oCy8f6E86', 1534704806129, 'abcdefg', '$2b$10$7qLKlebADXiewy7ToiM9vuEjN0Jj.7PQ0c3h7Szojsmc.Txw3A9N.');
INSERT INTO public."user" VALUES (22, 'ab@cd.com', '$2b$10$zXbhrIr/FzCQsI1piVLon.8bQjWS2VxdEgWTLDou1ENJBVv3abLs.', 1534704872585, 'ab', '$2b$10$qcOvJjFDLnIta.W85NYHl.eNdoLV6RDE8u8ay5hdEMwMQ6nxYgwZ2');
INSERT INTO public."user" VALUES (23, 'sdkljfjldsk@ifjds.khfds', '$2b$10$puEyRIIIZiaBeO9JgF9f/eMdACwQM2CTXYVnbg6Yt0J/5Nje4CBxW', 1534704998338, 'fdlsfkj', '$2b$10$Td3z6HDIPOZ7GMlQCCx4VOWTayTgBwRpYR/xUQiJIMJR8sS1avIQC');
INSERT INTO public."user" VALUES (24, 'abc@xyz.com', '$2b$10$mZ4/cUg1tCADq631KtUlLexJAaTetoPNQlfAnIxpCnOpqMSeCHVJC', 1534705779434, 'abc', '$2b$10$B./TuWI6wmPcEzj.wkdG2ONfyaN7qaorDCIT8whu//y1xFn1Me6gW');
INSERT INTO public."user" VALUES (25, 'cat@dog.com', '$2b$10$sc18.OqiqA4R1XT4g7kYB.09LuoMQR9/PsopY1Wx3zFHE7KvR43XG', 1534856079421, 'cat', '$2b$10$gZiBv.PAZDsIXSj3WiTYtuhcDurWDEF.TIYH4p15th0VXwh3Ikzia');
INSERT INTO public."user" VALUES (34, 'coconut@gmail.ersd', '$2b$10$8qe8.T9Dl5xT/cyym3DfS.PbDYEQP8amWokra8QHVGcz01GYOKBCy', 1538501989323, 'coconut', '$2b$10$rj82JmSWRw09wPy9QhxKS.UYchzU5EirPlQrFIwCITZ0FV5FDqGw2');
INSERT INTO public."user" VALUES (27, 'connor@newemail.com', '$2b$10$zvDGsEUa5C.XmXDLqiIyzuIJ19/hsBfSEAHCn5bLbVxaCBRhZcHZ2', 1536681465618, 'connor', '$2b$10$hnUW4y8D9wX3.saNbvxbiOY7cJro0GE7YIxSOVcPkJUIni9k.kD3S');
INSERT INTO public."user" VALUES (35, 'coconut@erereer.rer', '$2b$10$ue.431GBSnuFOFIrVkFcfe/5sgbQ4M.MmNmjrmit9ZBhp72LDLfGy', 1540502507953, 'coconut man', '$2b$10$F3Y/.sziYfDDr5TIyqS3qe3yGRqw6x.0glDZKIoELJNgeXBnyVBCm');
INSERT INTO public."user" VALUES (26, 'dog@cat.com', '$2b$10$nXPaRIwfmAvgDG9WkYpAA.fpI9LM5JEgL2sIc2DIT4.BQxslrVlLC', 1534856137178, 'dog', '$2b$10$LVtP7bOeBL77.nG6qvrCfeyeRqagS00zOOv9C74ICh0Hc79w.oyOS');
INSERT INTO public."user" VALUES (28, 'help@me.com', '$2b$10$bEDEkWFzYkJcmXvsNP8ZFuRY3xLJXswrjhs1SgplNzBLwlrwC3LDm', 1538149530026, 'outtheninthenoutagain', '$2b$10$ysVICzaYUr0uRqt3TQMIvOdKBq94MJZqAjylhvbjKRDaUEk5jQmia');
INSERT INTO public."user" VALUES (29, 'a@b.c', '$2b$10$DKnPfXxXsfkpraBCJAnTWOPML1zkeQWuxP6i7dfCMRP8//5YGNk52', 1538412787202, 'connor', '$2b$10$9XtEMawRRtWznaP2YfCV/eT6RWz1yO8Ev6ImPkhAIY1N0yziWYnRy');
INSERT INTO public."user" VALUES (30, 'connor@a.b', '$2b$10$/cXqx4m4ZvhSCCxToXqlkOuIX5Eu7Wc81ktDxWXIim0gAuooVvDf.', 1538412836026, 'connor', '$2b$10$.i5L3c/H/bBD3xHMXADJUOXUMoFEa2XjWpmP7/MUtYxnB7ffwiHD6');
INSERT INTO public."user" VALUES (31, 'dfds@fdsds.fd', '$2b$10$lGsMN6P4odGJG0hOM/n8huBwDUg7rG9kpb7JGEe4OV78Fdgqa/4FS', 1538412934467, 'fss', '$2b$10$zYA4lru8ZmjbaExQhU0dLejIUaQB4gwRqzv41Nj8qMPYJ0y2u/pX2');
INSERT INTO public."user" VALUES (32, 'fddf@dsfds.dsff', '$2b$10$F1t2Zbv0Oy2KQUykt8sztufshGwhENDE4Zynok95XNC74CJWY1Bf.', 1538412960162, 'dfdf', '$2b$10$D9Hm6BCyVwN1MYxHYyEW/ut7nnZeBHWDJPqEg69ikWt1GzDWhcNGK');
INSERT INTO public."user" VALUES (33, 'new@new.new', '$2b$10$Y8DwPInNa6BavVLu27l2f.Xu4ykN.kqFQa1SygznqBfmv1x6R6EWm', 1538412976514, 'new', '$2b$10$lSD0nTAbgHqJWID5/wzzleQuiWpqmf0tmpPhGK5mfsWlswSYBxaeq');


--
-- TOC entry 2831 (class 0 OID 0)
-- Dependencies: 198
-- Name: componentType_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."componentType_seq"', 11, true);


--
-- TOC entry 2832 (class 0 OID 0)
-- Dependencies: 196
-- Name: component_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.component_seq', 28, true);


--
-- TOC entry 2833 (class 0 OID 0)
-- Dependencies: 200
-- Name: user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_seq', 35, true);


--
-- TOC entry 2691 (class 2606 OID 16422)
-- Name: componentType componentType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."componentType"
    ADD CONSTRAINT "componentType_pkey" PRIMARY KEY ("componentTypeID");


--
-- TOC entry 2689 (class 2606 OID 16424)
-- Name: component component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT component_pkey PRIMARY KEY ("componentID");


--
-- TOC entry 2693 (class 2606 OID 16426)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userID");


--
-- TOC entry 2694 (class 2606 OID 16427)
-- Name: component componentType_componentTypeID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT "componentType_componentTypeID_fk" FOREIGN KEY ("componentTypeID") REFERENCES public."componentType"("componentTypeID");


--
-- TOC entry 2695 (class 2606 OID 16432)
-- Name: component user_userID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT "user_userID_fk" FOREIGN KEY ("userID") REFERENCES public."user"("userID");


-- Completed on 2018-10-28 20:26:02

--
-- PostgreSQL database dump complete
--

