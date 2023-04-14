// TODO Implement a cron job to run on vercel backing up the database periodically
import { Code } from "@components/Code";
import React from "react";
import { Disclosure } from "@components/Disclosure/Disclosure";

type DevGettingStartedProps = {};

const creatTableSQLQuery = `
create table documents (
  id bigserial primary key,
  content text,
  url text,
  embedding vector (1536)
`;

const matchDocumentsSQLFunction = `
create or replace function match_documents (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  url text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.url,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > similarity_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

`;

const spanClassNames =
  "text-sm break-all flex items-center my-2 italics whitespace-break-spaces";
const linkClassName =
  "externalLink !text-blue-900 transition-all hover:!scale-105 mx-2";
const disclosureClassName = "my-4";
export const DevGettingStarted =
  ({}: DevGettingStartedProps): React.ReactElement => {
    return (
      <>
        <div className="">
          <span className={spanClassNames}>
            Paste the following SQL query into subapase SQL console to enable
            the vector database extension, we will be using this to store all of
            our vector embeddings data, more info below.
          </span>
          <Code>create extension vector;</Code>
        </div>
        <div>
          <span className={spanClassNames}>
            The below command will create a table in the database where we can
            store our data, the table should have the same scheme as below, run
            the below command in the sql console:
          </span>
          <Code>{creatTableSQLQuery}</Code>
        </div>
        <div>
          <span className={spanClassNames}>
            The final step is to create a SQL function which will be used to
            retrieve data from the database that matches the user's query, this
            works by comparing the vectors stored in the database with the
            vectors generated from the users query
          </span>
          <Code>{matchDocumentsSQLFunction}</Code>
        </div>
        <div>
          <span className={spanClassNames}>
            Run the below command to setup your enviroment varibles, use your
            own varibles!
          </span>
          <Code>cp .env.local.example .env.local</Code>
          <div>
            <h2>Toggle the below dropdowns to see how to get each one</h2>
            <Disclosure
              className={disclosureClassName}
              title="SUPABASE_ANON_KEY & NEXT_PUBLIC_SUPABASE_URL"
            >
              <span className={spanClassNames}>
                Go to your{" "}
                <a
                  className={linkClassName}
                  href="https://app.supabase.com/projects#"
                  target="_blank"
                >
                  supabase projects dashboard
                </a>
                start a new project / create a new account if you haven't
                already then go to your project <span className="hover:text-green-700">settings</span> {"-->"} Api, the
                variables are there.
              </span>
            </Disclosure>
            <Disclosure className={disclosureClassName} title="OPENAI_API_KEY">
              <span className={spanClassNames}>
                Go the{" "}
                <a
                  className={linkClassName}
                  href="https://platform.openai.com/account/api-keys"
                >
                  https://platform.openai.com/account/api-keys
                </a>
                to get an api key
              </span>
            </Disclosure>
          </div>
        </div>
        <p>
          For more info check:{" "}
          <Code>components/Tour/SubSections/DevGettingStarted.tsx</Code>
        </p>
      </>
    );
  };
