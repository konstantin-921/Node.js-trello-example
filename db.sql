--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 9.5.13

-- Started on 2018-08-02 11:24:37 +03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12397)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 17531)
-- Name: boards; Type: TABLE; Schema: public; Owner: nodejs
--

CREATE TABLE public.boards (
    id bigint NOT NULL,
    caption text,
    user_id integer,
    share text
);


ALTER TABLE public.boards OWNER TO nodejs;

--
-- TOC entry 183 (class 1259 OID 17529)
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE public.boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO nodejs;

--
-- TOC entry 2176 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- TOC entry 186 (class 1259 OID 17547)
-- Name: tasks; Type: TABLE; Schema: public; Owner: nodejs
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    title text,
    content text,
    status text,
    "position" integer,
    boards_id integer
);


ALTER TABLE public.tasks OWNER TO nodejs;

--
-- TOC entry 185 (class 1259 OID 17545)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO nodejs;

--
-- TOC entry 2177 (class 0 OID 0)
-- Dependencies: 185
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 182 (class 1259 OID 17520)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name text,
    password text,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 17518)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2178 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2037 (class 2604 OID 17534)
-- Name: id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- TOC entry 2038 (class 2604 OID 17550)
-- Name: id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 2036 (class 2604 OID 17523)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2164 (class 0 OID 17531)
-- Dependencies: 184
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: nodejs
--



--
-- TOC entry 2179 (class 0 OID 0)
-- Dependencies: 183
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('public.boards_id_seq', 154, true);


--
-- TOC entry 2166 (class 0 OID 17547)
-- Dependencies: 186
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: nodejs
--



--
-- TOC entry 2180 (class 0 OID 0)
-- Dependencies: 185
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('public.tasks_id_seq', 2422, true);


--
-- TOC entry 2162 (class 0 OID 17520)
-- Dependencies: 182
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2181 (class 0 OID 0)
-- Dependencies: 181
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- TOC entry 2042 (class 2606 OID 17539)
-- Name: boards_pkey; Type: CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- TOC entry 2044 (class 2606 OID 17555)
-- Name: tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 17528)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2046 (class 2606 OID 17556)
-- Name: boards_id; Type: FK CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT boards_id FOREIGN KEY (boards_id) REFERENCES public.boards(id);


--
-- TOC entry 2045 (class 2606 OID 17540)
-- Name: user_id; Type: FK CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2174 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-08-02 11:24:37 +03

--
-- PostgreSQL database dump complete
--

