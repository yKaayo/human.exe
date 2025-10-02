-- SEQUENCES
create sequence seq_users start with 1 increment by 1;
create sequence seq_story start with 1 increment by 1;
create sequence seq_choice start with 1 increment by 1;
create sequence seq_cart start with 1 increment by 1;
create sequence seq_orders start with 1 increment by 1;
create sequence seq_order_items start with 1 increment by 1;

-- TABELAS
create table cyberpunk_users (
   id            number primary key,
   name          varchar(15) not null,
   email         varchar(30) not null,
   created_at    date not null,
   password_hash varchar(60) not null
);

create table cyberpunk_story_history (
   id            number primary key,
   story_content varchar(255) not null,
   created_at    date not null,
   id_user       number not null
);

create table cyberpunk_choices_history (
   id             number primary key,
   choice_content varchar(255) not null,
   created_at     date not null,
   id_user        number not null
);

create table cyberpunk_cart (
   id         number primary key,
   product_id varchar(50) not null,
   created_at date not null,
   id_user    number not null
);

create table cyberpunk_orders (
   id             number primary key,
   id_user        number not null,
   total_amount   number(10,2) not null,
   status         varchar2(20) default 'pending' not null,
   payment_method varchar2(50),
   created_at     date not null,
   updated_at     date,
   constraint chk_order_status
      check ( status in ( 'pending',
                          'paid',
                          'processing',
                          'shipped',
                          'delivered',
                          'cancelled' ) )
);

create table cyberpunk_order_items (
   id           number primary key,
   id_order     number not null,
   product_id   varchar2(50) not null,
   product_name varchar2(100) not null,
   quantity     number default 1 not null,
   unit_price   number(10,2) not null,
   subtotal     number(10,2) not null,
   created_at   date not null
);


-- Alter
alter table cyberpunk_story_history
   add constraint fk_user_story foreign key ( id_user )
      references cyberpunk_users ( id );

alter table cyberpunk_choices_history
   add constraint fk_user_choices foreign key ( id_user )
      references cyberpunk_users ( id );

alter table cyberpunk_cart
   add constraint fk_user_cart foreign key ( id_user )
      references cyberpunk_users ( id );

alter table cyberpunk_orders
   add constraint fk_user_orders foreign key ( id_user )
      references cyberpunk_users ( id );

alter table cyberpunk_order_items
   add constraint fk_order_items foreign key ( id_order )
      references cyberpunk_orders ( id );