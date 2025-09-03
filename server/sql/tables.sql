-- SEQUENCES
create sequence seq_users start with 1 increment by 1;
create sequence seq_game start with 1 increment by 1;

-- TABELAS
create table cyberpunk_users (
   id            number primary key,
   name          varchar(15) not null,
   email         varchar(30) not null,
   password_hash varchar(60) not null,
   created_at    date not null
);

create table cyberpunk_game (
   id      number primary key,
   points  number not null,
   id_user number not null
);

-- Alter
alter table cyberpunk_game
   add constraint fk_user_game foreign key ( id_user )
      references cyberpunk_users ( id );