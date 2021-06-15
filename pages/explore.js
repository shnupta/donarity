import Head from "next/head";

import Layout from "../components/layout";
import ExploreGrid from "../components/explore-grid";
import PageTitle from "../components/page-title";
import SearchInput from "../components/search-input"

import styles from "../styles/Explore.module.css";

import { UserRole } from "@prisma/client";
import React from "react";
import { getSession } from "next-auth/client";
import prisma from "lib/prisma";
import { InstantSearch, SortBy } from 'react-instantsearch-dom';
import algolia from 'lib/algolia';

export const getServerSideProps = async (context) => {
  // Get the user's session based on the request
  const session = await getSession(context);

  if (session && session.userRole === UserRole.Charity) {
    return {
      redirect: {
        destination: "/my-charity",
        permanent: false,
      },
    };
  }

  const charities = await prisma.charity.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  // let charitiesJson = charities;
  // for (var i = 0; i < charitiesJson.length; i++) {
  //   delete charitiesJson[i].logo;
  //   delete charitiesJson[i].image;
  //   delete charitiesJson[i].website;
  //   delete charitiesJson[i].facebook;
  //   delete charitiesJson[i].twitter;
  //   delete charitiesJson[i].linkedin;
  //   delete charitiesJson[i].instagram;
  //   delete charitiesJson[i].categoryId;
  //   delete charitiesJson[i].cityId;
  //   delete charitiesJson[i].city.id;
  //   delete charitiesJson[i].city.countryId;
  //   delete charitiesJson[i].city.country.id;
  //   delete charitiesJson[i].category.id;
  //   charitiesJson[i].objectID = charitiesJson[i].id;
  //   delete charitiesJson[i].id;
  // }
  // console.log(JSON.stringify(charitiesJson));

  return { props: { charities } };
};

export default function ExplorePage({ charities }) {
  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <Layout>
        <PageTitle>Explore</PageTitle>
        <p>
          Discover charities you are interested in, that match your values and
          that you are excited about, all on this page. You can search, make use
          of various filters and explore by category!
        </p>
        <section className={styles.explore_section}>
          <div className={styles.grid}>
            <InstantSearch searchClient={algolia} indexName={"donarity_charities"}>
              <div className={styles.searchRefinement}>
                <SearchInput className={styles.searchBar} />
                <SortBy
                  defaultRefinement="donarity_charities"
                  items={[
                    { value: 'donarity_charities', label: 'Name (alphabetical)' },
                    { value: 'size_asc', label: 'Size asc.' },
                    { value: 'size_desc', label: 'Size desc.' },
                  ]}
                />
              </div>
              <ExploreGrid charities={charities} />
            </InstantSearch>
          </div>
        </section>
      </Layout>
    </>
  );
}
