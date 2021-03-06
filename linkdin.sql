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
-- Name: job; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE job (
    jobid integer NOT NULL,
    country character varying(15) NOT NULL,
    description text,
    company character varying(30) NOT NULL,
    closedat date,
    username character varying(20) NOT NULL,
    createdat date NOT NULL,
    approvedat date,
    jobname character varying(30) NOT NULL,
    fieldofinterest character varying(20),
    picture text,
    numberofviews integer DEFAULT 0
);


ALTER TABLE job OWNER TO postgres;

--
-- Name: job_applicant; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE job_applicant (
    jobid integer NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE job_applicant OWNER TO postgres;

--
-- Name: job_jobid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE job_jobid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_jobid_seq OWNER TO postgres;

--
-- Name: job_jobid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE job_jobid_seq OWNED BY job.jobid;


--
-- Name: log; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE log (
    log_id integer NOT NULL,
    text text NOT NULL,
    created_at date NOT NULL
);


ALTER TABLE log OWNER TO postgres;

--
-- Name: log_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE log_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE log_log_id_seq OWNER TO postgres;

--
-- Name: log_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE log_log_id_seq OWNED BY log.log_id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
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


ALTER TABLE notification OWNER TO postgres;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notification_notificationid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notification_notificationid_seq OWNER TO postgres;

--
-- Name: notification_notificationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notification_notificationid_seq OWNED BY notification.notificationid;


--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE post (
    postid integer NOT NULL,
    content text NOT NULL,
    createdat date NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE post OWNER TO postgres;

--
-- Name: post_comment; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE post_comment (
    postid integer NOT NULL,
    username character varying(20) NOT NULL,
    comment text NOT NULL,
    createdat date NOT NULL
);


ALTER TABLE post_comment OWNER TO postgres;

--
-- Name: post_like; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE post_like (
    postid integer NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE post_like OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_postid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_postid_seq OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_postid_seq OWNED BY post.postid;


--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE project (
    projectid integer NOT NULL,
    projectname character varying(30) NOT NULL,
    description text,
    createdat date NOT NULL,
    username character varying(20) NOT NULL,
    fieldrelated character varying(20),
    picture text
);


ALTER TABLE project OWNER TO postgres;

--
-- Name: project_projectid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE project_projectid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE project_projectid_seq OWNER TO postgres;

--
-- Name: project_projectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE project_projectid_seq OWNED BY project.projectid;


--
-- Name: user_connection; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_connection (
    username1 character varying(20) NOT NULL,
    username2 character varying(20) NOT NULL,
    approvedat date,
    CONSTRAINT user_connection_not_same_users CHECK (((username1)::text <> (username2)::text))
);


ALTER TABLE user_connection OWNER TO postgres;

--
-- Name: user_experience; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_experience (
    title character varying(20) NOT NULL,
    company character varying(30) NOT NULL,
    username character varying(20) NOT NULL
);


ALTER TABLE user_experience OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
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
    isadmin bit(1) NOT NULL,
    createdat date NOT NULL,
    country character varying(15) NOT NULL,
    approvedat date,
    fieldofinterest character varying(20),
    company character varying(40),
    picture text
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: jobid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job ALTER COLUMN jobid SET DEFAULT nextval('job_jobid_seq'::regclass);


--
-- Name: log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY log ALTER COLUMN log_id SET DEFAULT nextval('log_log_id_seq'::regclass);


--
-- Name: notificationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification ALTER COLUMN notificationid SET DEFAULT nextval('notification_notificationid_seq'::regclass);


--
-- Name: postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post ALTER COLUMN postid SET DEFAULT nextval('post_postid_seq'::regclass);


--
-- Name: projectid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project ALTER COLUMN projectid SET DEFAULT nextval('project_projectid_seq'::regclass);


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY job (jobid, country, description, company, closedat, username, createdat, approvedat, jobname, fieldofinterest, picture, numberofviews) FROM stdin;
47	Philippines	Develops apps for android.	Google	2015-11-27	admin	2015-11-27	2015-11-27	Android Developer	Mobile Development	\N	7
46	Pakistan	Designs a web.	any.tv	\N	tricycle	2015-11-27	2015-11-27	Web Designer	Web Design	\N	1
45	United Stated	Responsible for UX designing.	Kooapps	2015-11-27	admin	2015-11-27	2015-11-27	UX Designer	Computing	\N	16
39	Philippines	dummy description	ANY TV	2015-11-22	admin	2015-11-22	2015-11-22	PROGAMER!!!!	Gambling	\N	16
\.


--
-- Data for Name: job_applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY job_applicant (jobid, username) FROM stdin;
47	tricycle
\.


--
-- Name: job_jobid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('job_jobid_seq', 47, true);


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY log (log_id, text, created_at) FROM stdin;
1	test text	2015-11-22
\.


--
-- Name: log_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('log_log_id_seq', 1, true);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notification (notificationid, text, url, createdat, jobid, username) FROM stdin;
1	google!	www.google.com	2015-11-22	\N	admin
2	example!	www.example.com	2015-11-22	39	\N
\.


--
-- Name: notification_notificationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notification_notificationid_seq', 2, true);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post (postid, content, createdat, username) FROM stdin;
\.


--
-- Data for Name: post_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post_comment (postid, username, comment, createdat) FROM stdin;
\.


--
-- Data for Name: post_like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post_like (postid, username) FROM stdin;
\.


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_postid_seq', 1, true);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY project (projectid, projectname, description, createdat, username, fieldrelated, picture) FROM stdin;
\.


--
-- Name: project_projectid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('project_projectid_seq', 1, true);


--
-- Data for Name: user_connection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_connection (username1, username2, approvedat) FROM stdin;
admin	tricycle	2015-11-27
admin	aron51	2015-11-27
WareAnj	tricycle	2015-11-27
WareAnj	beastmatt	2015-11-27
beastmatt	tricycle	2015-11-27
admin	WareAnj	2015-11-27
\.


--
-- Data for Name: user_experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_experience (title, company, username) FROM stdin;
Janitor	Jollibee	tricycle
Model	Freelance Model	tricycle
Cashier	SM	aron51
Clerk	GSIS	queen_tin
		beastmatt
CEO	Google	WareAnj
Deputy CEO	Facebook	WareAnj
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (username, password, fname, mname, lname, occupation, college, degree, isadmin, createdat, country, approvedat, fieldofinterest, company, picture) FROM stdin;
WareAnj	WareAnj	Angelica	Panganiban	Ware	Chef	University of the Philippines	BS Computer Science	0	2015-11-27	Philippines	2015-11-27	Web Development	Cocina	/uploads\\3c93ce2814ec92a7cbd77530d1d0c890.png
beastmatt	beastmatt	Joseph Matthew	Ferdinand	Marcos	Systems Analyst	University of California	BS Information Technology	0	2015-11-27	United Stated	2015-11-27	Systems Analysis	Ideatech	/uploads\\e27ffecb034c8549251e784366af51b6.png
aron51	aron51	Aron	Jay	Vibar	Photographer	STI College	BA Photography	0	2015-11-27	Philippines	2015-11-27	Photography	Freelance Model	/uploads\\8492245291798562617a9adeb17b60ff.png
queen_tin	queen_tin	Anne Kristine	Kirsten	Montoya	Professor	University of the Philippines	BS Computer Science	0	2015-11-27	Philippines	2015-11-27	Teaching	University of the Philippines	/uploads\\f3067f351cea3a764e09ecc70057fd47.png
pmjacinto	password	Prince	Macaraeg	Jacinto	Database Designer	UPLB	BSCS	0	2015-11-27	Philippines	\N	Web Design	IBM	/uploads\\ce868d9e8fd4cf4620c36568b28d02fb.png
tricycle	123123	Peter Bernard	Mariano	Rupa	Web Developer	University of the Philippines	BS Computer Science	0	2015-11-26	Afghanistan	2015-11-26	Web Development	any.tv	/uploads\\701eb05d7c651c651dbdd4a8f178988a.jpg
admin	useruser	Jireh Lim	Fans	Club	Singer	STI	BA Music	1	2015-10-29	Pakistan	2015-11-26	Music	Viva Records	/img/003.jpg
\.


--
-- Name: job_jobid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_jobid_pk PRIMARY KEY (jobid);


--
-- Name: log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY log
    ADD CONSTRAINT log_pkey PRIMARY KEY (log_id);


--
-- Name: notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notificationid);


--
-- Name: post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (postid);


--
-- Name: project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (projectid);


--
-- Name: user_connection_username1_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_username1_pk PRIMARY KEY (username1, username2);


--
-- Name: user_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_experience
    ADD CONSTRAINT user_experience_pkey PRIMARY KEY (title, company);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: job_applicant_jobid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job_applicant
    ADD CONSTRAINT job_applicant_jobid_fk FOREIGN KEY (jobid) REFERENCES job(jobid) ON DELETE CASCADE;


--
-- Name: job_applicant_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job_applicant
    ADD CONSTRAINT job_applicant_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: job_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: noficication_jobid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT noficication_jobid_fk FOREIGN KEY (jobid) REFERENCES job(jobid) ON DELETE CASCADE;


--
-- Name: noficication_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT noficication_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_comment_postid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_postid_fk FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE;


--
-- Name: post_comment_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_like_postid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_like
    ADD CONSTRAINT post_like_postid_fk FOREIGN KEY (postid) REFERENCES post(postid) ON DELETE CASCADE;


--
-- Name: post_like_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_like
    ADD CONSTRAINT post_like_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: post_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: project_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_username_fk FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_connection_username1_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_username1_fk FOREIGN KEY (username1) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_connection_username2_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_username2_fk FOREIGN KEY (username2) REFERENCES users(username) ON DELETE CASCADE;


--
-- Name: user_experience_username_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
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

