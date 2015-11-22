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
    company character varying(30) NOT NULL,
    picture character varying(40),
    closedat date,
    username character varying(20) NOT NULL,
    createdat date NOT NULL,
    approvedat date,
    name character varying(30) NOT NULL,
    fieldofinterest character varying(20)
);


ALTER TABLE public.job OWNER TO proj127;

--
-- Name: job_applicant; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE job_applicant (
    jobid integer NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.job_applicant OWNER TO proj127;

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
    notificationid integer NOT NULL,
    text text NOT NULL,
    url text NOT NULL,
    createdat date NOT NULL,
    jobid integer,
    username character varying(20),
    CONSTRAINT notification_check_jobid_username CHECK (((jobid IS NULL) <> (username IS NULL)))
);


ALTER TABLE public.notification OWNER TO proj127;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE notification_notificationid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_notificationid_seq OWNER TO proj127;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE notification_notificationid_seq OWNED BY notification.notificationid;


--
-- Name: post; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE post (
    postid integer NOT NULL,
    content text NOT NULL,
    createdat date NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.post OWNER TO proj127;

--
-- Name: post_comment; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE post_comment (
    postid integer NOT NULL,
    username character varying(20) NOT NULL,
    comment text NOT NULL,
    createdat date NOT NULL
);


ALTER TABLE public.post_comment OWNER TO proj127;

--
-- Name: post_like; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE post_like (
    postid integer NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.post_like OWNER TO proj127;

--
-- Name: post_postid_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE post_postid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_postid_seq OWNER TO proj127;

--
-- Name: post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE post_postid_seq OWNED BY post.postid;


--
-- Name: project; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE project (
    projectid integer NOT NULL,
    projectname character varying(30) NOT NULL,
    description text,
    picture character varying(40),
    createdat date NOT NULL,
    username character varying(20) NOT NULL,
    fieldrelated character varying(20)
);


ALTER TABLE public.project OWNER TO proj127;

--
-- Name: project_projectid_seq; Type: SEQUENCE; Schema: public; Owner: proj127
--

CREATE SEQUENCE project_projectid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_projectid_seq OWNER TO proj127;

--
-- Name: project_projectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proj127
--

ALTER SEQUENCE project_projectid_seq OWNED BY project.projectid;


--
-- Name: user_connection; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE user_connection (
    username1 character varying(20) NOT NULL,
    username2 character varying(20) NOT NULL,
    approvedat date,
    CONSTRAINT user_connection_not_same_users CHECK (((username1)::text <> (username2)::text))
);


ALTER TABLE public.user_connection OWNER TO proj127;

--
-- Name: user_experience; Type: TABLE; Schema: public; Owner: proj127; Tablespace: 
--

CREATE TABLE user_experience (
    title character varying(20) NOT NULL,
    company character varying(30) NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE public.user_experience OWNER TO proj127;

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
    approvedat date,
    fieldofinterest character varying(20),
    company character varying(40)
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
-- Name: notificationid; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification ALTER COLUMN notificationid SET DEFAULT nextval('notification_notificationid_seq'::regclass);


--
-- Name: postid; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post ALTER COLUMN postid SET DEFAULT nextval('post_postid_seq'::regclass);


--
-- Name: projectid; Type: DEFAULT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY project ALTER COLUMN projectid SET DEFAULT nextval('project_projectid_seq'::regclass);


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY job (jobid, country, description, company, picture, closedat, username, createdat, approvedat, name, fieldofinterest) FROM stdin;
39	Philippines	dummy description	ANY TV	\N	2015-11-22	admin	2015-11-22	2015-11-22	PROGAMER!!!!	\N
\.


--
-- Data for Name: job_applicant; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY job_applicant (jobid, username) FROM stdin;
39	xXxBaDbOyZzZ
\.


--
-- Name: job_jobid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('job_jobid_seq', 39, true);


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY log (log_id, text, created_at) FROM stdin;
1	test text	2015-11-22
\.


--
-- Name: log_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('log_log_id_seq', 1, true);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY notification (notificationid, text, url, createdat, jobid, username) FROM stdin;
1	google!	www.google.com	2015-11-22	\N	admin
2	example!	www.example.com	2015-11-22	39	\N
\.


--
-- Name: notification_notificationid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('notification_notificationid_seq', 2, true);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY post (postid, content, createdat, username) FROM stdin;
1	Hi po!	2015-11-22	xXxBaDbOyZzZ
\.


--
-- Data for Name: post_comment; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY post_comment (postid, username, comment, createdat) FROM stdin;
1	admin	hi rin! :3	2015-11-22
\.


--
-- Data for Name: post_like; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY post_like (postid, username) FROM stdin;
1	procopio
\.


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('post_postid_seq', 1, true);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY project (projectid, projectname, description, picture, createdat, username, fieldrelated) FROM stdin;
1	OPLAN127	sample description should be here	\N	2015-11-22	procopio	\N
\.


--
-- Name: project_projectid_seq; Type: SEQUENCE SET; Schema: public; Owner: proj127
--

SELECT pg_catalog.setval('project_projectid_seq', 1, true);


--
-- Data for Name: user_connection; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY user_connection (username1, username2, approvedat) FROM stdin;
procopio	xXxBaDbOyZzZ	\N
xXxBaDbOyZzZ	procopio	\N
procopio	admin	\N
admin	procopio	\N
\.


--
-- Data for Name: user_experience; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY user_experience (title, company, username) FROM stdin;
Badboy	BadBoy&Co.	xXxBaDbOyZzZ
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: proj127
--

COPY users (username, password, fname, mname, lname, occupation, college, degree, picture, isadmin, createdat, country, approvedat, fieldofinterest, company) FROM stdin;
admin	useruser	Jireh Lim	Fans	Club	\N	\N	\N	\N	1	2015-10-29	Philippines	\N	\N	\N
procopio	secret	NAGG	SI	BATUS	housewife	CDLB	BS LoL		0	2015-11-15	Philippines	\N	\N	\N
xXxBaDbOyZzZ	iamsopogi	Juan	Gregoriyo	dela Cruz	Janitor	UP with reservations	BS Rubix Cube	\N	0	2015-11-22	Philippines	2015-11-22	\N	\N
anon12345	nooneknows	Hidden	Anon	Anonymous	administrator	UP-ish	BS Vulcanizing	\N	1	2015-11-22	Philippines	\N	Gambling	Anonymity Merchandise
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
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notificationid);


--
-- Name: post_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (postid);


--
-- Name: project_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (projectid);


--
-- Name: user_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_pkey PRIMARY KEY (title, company);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: proj127; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: job_applicant_jobid_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job_applicant
    ADD CONSTRAINT job_applicant_jobid_fk FOREIGN KEY (jobid) REFERENCES job(jobid) ON DELETE CASCADE;


--
-- Name: job_applicant_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job_applicant
    ADD CONSTRAINT job_applicant_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: job_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: noficication_jobid_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT noficication_jobid_fk FOREIGN KEY (jobid) REFERENCES job(jobid) ON DELETE CASCADE;


--
-- Name: noficication_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT noficication_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_comment_postid_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_postid_fk FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE;


--
-- Name: post_comment_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_like_postid_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post_like
    ADD CONSTRAINT post_like_postid_fk FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE;


--
-- Name: post_like_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post_like
    ADD CONSTRAINT post_like_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: project_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_connection_username1_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_username1_fk FOREIGN KEY (username1) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_connection_username2_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_username2_fk FOREIGN KEY (username2) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_experience_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: proj127
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


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

