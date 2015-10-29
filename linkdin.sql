--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: job; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE job (
    jobid integer NOT NULL,
    country character varying(15) NOT NULL,
    description text,
    fieldsrelated character varying(30),
    company character varying(30) NOT NULL,
    picture character varying(40),
    closedat date,
    username character varying(20) NOT NULL,
    createdat date NOT NULL,
    approvedat date NOT NULL
);


ALTER TABLE public.job OWNER TO proj127;

--
-- Name: job_jobid_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE job_jobid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_jobid_seq OWNER TO proj127;

--
-- Name: job_jobid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE job_jobid_seq OWNED BY job.jobid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE users (
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    fname character varying(15) NOT NULL,
    mname character varying(10) NOT NULL,
    lname character varying(10) NOT NULL,
    occupation character varying(20),
    college character varying(40),
    degree character varying(40),
    picture character varying(40),
    isadmin bit(1) NOT NULL,
    createdat date NOT NULL,
    approvedat date NOT NULL,
    country character varying(15) NOT NULL
);


ALTER TABLE public.users OWNER TO proj127;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY civillian ALTER COLUMN id SET DEFAULT nextval('civillian_id_seq'::regclass);


--
-- Name: jobid; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job ALTER COLUMN jobid SET DEFAULT nextval('job_jobid_seq'::regclass);


--
-- Data for Name: civillian; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY civillian (id, name) FROM stdin;
1	Carlo
2	Brian
3	Margarette
\.


--
-- Name: civillian_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('civillian_id_seq', 1, false);


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY job (jobid, country, description, fieldsrelated, company, picture, closedat, username, createdat, approvedat) FROM stdin;
2	Philippines	\N	\N	Jireh Lim Company	\N	\N	admin	2015-10-29	2015-10-29
\.


--
-- Name: job_jobid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('job_jobid_seq', 2, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY users (username, password, fname, mname, lname, occupation, college, degree, picture, isadmin, createdat, approvedat, country) FROM stdin;
admin	useruser	Jireh Lim	Fans	Club	\N	\N	\N	\N	1	2015-10-29	2015-10-29	Philippines
\.


--
-- Name: civillian_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY civillian
    ADD CONSTRAINT civillian_pkey PRIMARY KEY (id);


--
-- Name: job_jobid_pk; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_jobid_pk PRIMARY KEY (jobid);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: job_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_username_fk FOREIGN KEY (username) REFERENCES users(username);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

