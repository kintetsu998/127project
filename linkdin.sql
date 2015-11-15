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
    approvedat date
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
-- Name: log; Type: TABLE; Schema: public; Owner: proj127; Tablespace:
--

CREATE TABLE log (
    log_id integer NOT NULL,
    text text NOT NULL,
    created_at date NOT NULL
);


ALTER TABLE public.log OWNER TO proj127;

--
-- Name: log_log_id_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE log_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_log_id_seq OWNER TO proj127;

--
-- Name: log_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE log_log_id_seq OWNED BY log.log_id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: proj127; Tablespace:
--

CREATE TABLE notification (
    notification_id integer NOT NULL,
    text text NOT NULL,
    url text NOT NULL,
    created_at date NOT NULL,
    job_id integer,
    username character varying(20)
);


ALTER TABLE public.notification OWNER TO proj127;

--
-- Name: notification_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE notification_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_notification_id_seq OWNER TO proj127;

--
-- Name: notification_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE notification_notification_id_seq OWNED BY notification.notification_id;


--
-- Name: user_experience; Type: TABLE; Schema: public; Owner: proj127; Tablespace:
--

CREATE TABLE user_experience (
    title character varying(20),
    company character varying(30) NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.user_experience OWNER TO proj127;

--
-- Name: user_fieldofinterest; Type: TABLE; Schema: public; Owner: proj127; Tablespace:
--

CREATE TABLE user_fieldofinterest (
    field character varying(20) NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.user_fieldofinterest OWNER TO proj127;

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
    country character varying(15) NOT NULL,
    approvedat date
);


ALTER TABLE public.users OWNER TO proj127;

--
-- Name: jobid; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job ALTER COLUMN jobid SET DEFAULT nextval('job_jobid_seq'::regclass);


--
-- Name: log_id; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY log ALTER COLUMN log_id SET DEFAULT nextval('log_log_id_seq'::regclass);


--
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification ALTER COLUMN notification_id SET DEFAULT nextval('notification_notification_id_seq'::regclass);


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY job (jobid, country, description, fieldsrelated, company, picture, closedat, username, createdat, approvedat) FROM stdin;
2	Philippines	\N	\N	Jireh Lim Company	\N	\N	admin	2015-10-29	\N
3	Philippines	\N	\N	Nestle Company	\N	\N	admin	2015-10-30	\N
4	Philippines	\N	\N	PNG Company	\N	\N	admin	2015-10-30	\N
5	Philippines	\N	\N	Jollibee Company	\N	\N	admin	2015-10-30	\N
\.


--
-- Name: job_jobid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('job_jobid_seq', 37, true);


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY log (log_id, text, created_at) FROM stdin;
\.


--
-- Name: log_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('log_log_id_seq', 1, false);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY notification (notification_id, text, url, created_at, job_id, username) FROM stdin;
\.


--
-- Name: notification_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('notification_notification_id_seq', 1, false);


--
-- Data for Name: user_experience; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY user_experience (title, company, username) FROM stdin;
\.


--
-- Data for Name: user_fieldofinterest; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY user_fieldofinterest (field, username) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY users (username, password, fname, mname, lname, occupation, college, degree, picture, isadmin, createdat, country, approvedat) FROM stdin;
admin	useruser	Jireh Lim	Fans	Club	\N	\N	\N	\N	1	2015-10-29	Philippines	\N
\.


--
-- Name: job_jobid_pk; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_jobid_pk PRIMARY KEY (jobid);


--
-- Name: log_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY log
    ADD CONSTRAINT log_pkey PRIMARY KEY (log_id);


--
-- Name: notification_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notification_id);


--
-- Name: user_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_pkey PRIMARY KEY (company);


--
-- Name: user_experience_title_key; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_title_key UNIQUE (title);


--
-- Name: user_fieldofinterest_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace:
--

ALTER TABLE ONLY user_fieldofinterest
    ADD CONSTRAINT user_fieldofinterest_pkey PRIMARY KEY (field);


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
-- Name: notification_job_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_job_id_fk FOREIGN KEY (job_id) REFERENCES job(jobid);


--
-- Name: notification_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_username_fk FOREIGN KEY (username) REFERENCES users(username);


--
-- Name: user_experience_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_username_fk FOREIGN KEY (username) REFERENCES users(username);


--
-- Name: user_fieldofexperience_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY user_fieldofinterest
    ADD CONSTRAINT user_fieldofexperience_username_fk FOREIGN KEY (username) REFERENCES users(username);


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
