-- SEQUENCES
create sequence seq_users start with 1 increment by 1;
create sequence seq_story start with 1 increment by 1;
create sequence seq_choice start with 1 increment by 1;

-- TABELAS
create table cyberpunk_users (
   id            number primary key,
   name          varchar(15) not null,
   email         varchar(30) not null,
   created_at    date not null,
   password_hash varchar(60) not null
);

create table cyberpunk_story_history (
   id      number primary key,
   story_content varchar(255) not null,
   created_at    date not null,
   id_user number not null
);

create table cyberpunk_choices_history (
   id      number primary key,
   choice_content varchar(255) not null,
   created_at    date not null,
   id_user number not null
);

-- Alter
alter table cyberpunk_story_history
   add constraint fk_user_story foreign key ( id_user )
      references cyberpunk_users ( id );

alter table cyberpunk_choices_history
   add constraint fk_user_choices foreign key ( id_user )
      references cyberpunk_users ( id );