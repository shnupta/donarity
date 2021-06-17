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
import { InstantSearch } from 'react-instantsearch-dom';
import algolia from 'lib/algolia';
import Modal from '../components/modal';
import Button from '../components/button';
import ClearFilters from '../components/clear-filters';
import SizeFilter from '../components/size-filter';
import ScopeSelector from "../components/scope-selector";
import CategorySelect from "../components/category-select";
import SortBy from "../components/sort-by";
import ExploreTile from "../components/explore-tile";

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

  const featuredCharityObj = await prisma.featuredCharity.findFirst({
    include: {
      charity: true
    },
    orderBy: {
      dateFeatured: "desc"
    }
  });

  const featuredCharity = featuredCharityObj.charity;

  return { props: { charities, featuredCharity } };
};

export default function ExplorePage({ charities, featuredCharity }) {

  const [filtersOpen, setFiltersOpen] = React.useState(false);

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
        <section className={styles.section}>
          <h1>Featured Charity</h1>
          <ExploreTile horizontal charity={featuredCharity} />
        </section>
        <section className={styles.section}>
          <div className={styles.grid}>
            <InstantSearch searchClient={algolia} indexName={"donarity_charities"}>
              <div className={styles.searchRefinement}>
                <div className={styles.filterBar}>
                  <SearchInput className={styles.searchBar} />
                  <SortBy
                    defaultRefinement="donarity_charities"
                    items={[
                      { value: 'donarity_charities', label: 'Name' },
                      { value: 'size_asc', label: 'Size asc.' },
                      { value: 'size_desc', label: 'Size desc.' },
                    ]}
                  />
                  <Button icon="/filter.svg" className={styles.filterButton} onClick={() => setFiltersOpen(true)}>Filter</Button>
                </div>
                <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)}>
                  <h1 className={styles.filtersTitle}>Filters</h1>
                  <CategorySelect className={styles.filterTile} attribute="category.name" />
                  <SizeFilter className={styles.filterTile} attribute="size" min={0} max={999999999} />
                  <ScopeSelector className={styles.filterTile} attribute="scope" />
                  <ClearFilters className={styles.clear} />
                </Modal>
              </div>
              <ExploreGrid charities={charities} />
            </InstantSearch>
          </div>
        </section>
      </Layout>
    </>
  );
}
