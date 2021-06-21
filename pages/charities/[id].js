import styles from "../../styles/Charity.module.css";

import prisma from "../../lib/prisma";
import Layout from "../../components/layout";
import Button from "../../components/button";
import ExtendedCharitySummary from "../../components/extended-charity-summary"
import CharityInfo from "../../components/charity-info"
import Link from "next/link"
import ArrowLink from "../../components/arrow-link";
import ProjectTile from "../../components/project-tile";
import ProjectSlider from "../../components/project-slider";

export const getServerSideProps = async (context) => {
  // Find the model in prisma/schema.prisma
  const charity = await prisma.charity.findUnique({
    where: {
      id: context.params.id,
    },
    include: {
      category: true,
      city: {
        include: {
          country: true,
        },
      },
      links: true,
      projects: {
        include: {
          charity: true,
        },
      },
    },
  });

  if (!charity) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return { props: { charity } };
};

export default function CharityPage({ charity }) {

  return (
    <Layout headerImg={charity.image}>
      <ExtendedCharitySummary charity={charity} />
      <div className={styles.donateButtons}>
        <Link href={"/donate/" + charity.id}>
          <a>
            <Button>Donate</Button>
          </a>
        </Link>
        <Button white>Add to split donation</Button>
      </div>
      <div className={styles.extraInfo}>
        <CharityInfo charity={charity} />
        {charity.links.length > 0 && 
        <div>
          <h2>Featured Links:</h2>
          {charity.links.map((link, key) => {
            return <ArrowLink key={key} href={link.url}>{link.text}</ArrowLink>
          })}
        </div>
        }
      </div>
      {charity.projects.length > 0 &&
        <div className={styles.projectsSection}>
          <h1>Projects</h1>
          <ProjectTile project={charity.projects[0]} />
          {/* <ProjectSlider projects={charity.projects} /> */}
        </div>
      }

    </Layout>
  );
}