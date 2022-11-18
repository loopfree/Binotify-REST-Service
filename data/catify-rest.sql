--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Song; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Song" (
    song_id integer NOT NULL,
    judul character(64) NOT NULL,
    penyanyi_id integer NOT NULL,
    audio_path character(256) NOT NULL
);


ALTER TABLE public."Song" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    user_id integer NOT NULL,
    email character(256) NOT NULL,
    password character(256) NOT NULL,
    username character(256) NOT NULL,
    name character(256) NOT NULL,
    isadmin boolean NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Data for Name: Song; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Song" (song_id, judul, penyanyi_id, audio_path) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (user_id, email, password, username, name, isadmin) FROM stdin;
\.


--
-- Name: Song Song_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Song"
    ADD CONSTRAINT "Song_pkey" PRIMARY KEY (song_id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- Name: Song fk_penyanyi_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Song"
    ADD CONSTRAINT fk_penyanyi_id FOREIGN KEY (penyanyi_id) REFERENCES public."User"(user_id);


--
-- PostgreSQL database dump complete
--

