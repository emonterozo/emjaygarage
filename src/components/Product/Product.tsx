'use client';

import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { ChevronLeft, ChevronRight, FiberManualRecord } from '@mui/icons-material';
import { Box, Grid, Typography, List, ListItem, Card, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PhotoView, PhotoProvider } from 'react-photo-view';
import { Product as ProductTypes } from '@/types/types';
import Image from 'next/image';

import 'react-photo-view/dist/react-photo-view.css';

const CustomCheckIcon = () => (
  <SvgIcon viewBox="0 0 256 256">
    <g fill="#ffffff">
      <g transform="scale(5.12,5.12)">
        <path d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-4.56 -1.33972,-8.81067 -3.63672,-12.38867l-1.36914,1.61719c1.895,3.154 3.00586,6.83148 3.00586,10.77148c0,11.579 -9.421,21 -21,21c-11.579,0 -21,-9.421 -21,-21c0,-11.579 9.421,-21 21,-21c5.443,0 10.39391,2.09977 14.12891,5.50977l1.30859,-1.54492c-4.085,-3.705 -9.5025,-5.96484 -15.4375,-5.96484zM43.23633,7.75391l-19.32227,22.80078l-8.13281,-7.58594l-1.36328,1.46289l9.66602,9.01563l20.67969,-24.40039z"></path>
      </g>
    </g>
  </SvgIcon>
);

export type ProductProps = {
  product: ProductTypes;
};

export default function Product({ product }: Readonly<ProductProps>) {
  const theme = useTheme();
  const leftGridRef = useRef<HTMLDivElement | null>(null);
  const [leftGridHeight, setLeftGridHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300, // Adjust scroll amount
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (leftGridRef.current) {
      setLeftGridHeight(leftGridRef.current.clientHeight + 80);
    }
  }, [product]);

  return (
    <Box bgcolor={theme.palette.primary.main}>
      <Box sx={{ paddingX: '5%', paddingTop: '5%' }}>
        <Grid container spacing={3}>
          <Grid ref={leftGridRef} size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Typography
                  color="#D9D9D9"
                  sx={{
                    fontSize: {
                      xs: '22px',
                      md: '40px',
                    },
                    fontFamily: 'Centauri',
                  }}
                >
                  {product?.name}
                </Typography>
                <Typography
                  color="#D9D9D9"
                  sx={{
                    fontSize: {
                      xs: '18px',
                      md: '20px',
                    },
                    fontFamily: 'Centauri',
                  }}
                >
                  {`₱ ${product.price.toLocaleString()}`}
                </Typography>
              </Box>

              <Typography
                color="#D9D9D9"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                }}
              >
                {product?.description}
              </Typography>
              <Box>
                <Typography
                  color="#D9D9D9"
                  sx={{
                    fontSize: {
                      xs: '18px',
                      md: '20px',
                    },
                    fontFamily: 'Centauri',
                  }}
                >
                  Specifications
                </Typography>
                <List>
                  {product?.details.map((detail) => (
                    <ListItem key={detail} sx={{ gap: '12px' }}>
                      <CustomCheckIcon />
                      <Typography
                        color="#D9D9D9"
                        sx={{
                          fontFamily: 'Poppins',
                          fontSize: {
                            xs: '14px',
                            md: '16px',
                          },
                        }}
                      >
                        {detail}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
              {product.financing_details.down_payment && (
                <Box>
                  <Box display="flex" flexDirection="column" gap="16px">
                    <Typography
                      color="#D9D9D9"
                      sx={{
                        fontSize: {
                          xs: '18px',
                          md: '20px',
                        },
                        fontFamily: 'Centauri',
                      }}
                    >
                      Financing Details
                    </Typography>
                    <Typography
                      color="#D9D9D9"
                      sx={{
                        fontFamily: 'Poppins',
                        fontSize: {
                          xs: '14px',
                          md: '16px',
                        },
                      }}
                    >
                      {`All in down payment ₱${product?.financing_details.down_payment.toLocaleString()}`}
                    </Typography>
                  </Box>
                  <Box marginTop="20px" display="flex" flexDirection="column" gap="16px">
                    {product?.financing_details.terms.map((item) => (
                      <Box
                        key={item.term}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Typography
                          color="#D9D9D9"
                          sx={{
                            fontFamily: 'Poppins',
                            fontSize: {
                              xs: '18px',
                              md: '32px',
                            },
                          }}
                        >
                          {item.term}
                        </Typography>
                        <Typography
                          color="#D9D9D9"
                          sx={{ fontFamily: 'Poppins', fontSize: '12px' }}
                        >
                          Months
                        </Typography>
                        <FiberManualRecord sx={{ width: '5px', height: '5px' }} color="secondary" />
                        <Typography
                          color="#D9D9D9"
                          sx={{
                            fontFamily: 'Poppins',
                            fontSize: {
                              xs: '14px',
                              md: '16px',
                            },
                          }}
                        >
                          {`₱${item.amount.toLocaleString()}`}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {product && (
            <PhotoProvider>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid
                  container
                  spacing={{
                    xs: 1,
                    md: 2,
                  }}
                >
                  <Grid size={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <PhotoView src={product?.images[0]}>
                      <Card
                        sx={{
                          borderRadius: '24px',
                          height: `${leftGridHeight * 0.5}px`,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={product?.images[0]}
                          alt={product.name}
                          width={0}
                          height={0}
                          style={{
                            height: `${leftGridHeight * 0.5}px`,
                            width: '100%',
                            objectFit: 'cover',
                          }}
                          sizes="100vw"
                        />
                      </Card>
                    </PhotoView>
                  </Grid>

                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        left: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                      }}
                      onClick={() => scroll('left')}
                    >
                      <ChevronLeft
                        sx={{
                          width: { xs: '20px', md: '35px' },
                          height: { xs: '20px', md: '35px' },
                        }}
                      />
                    </IconButton>
                    <Box
                      ref={scrollRef}
                      sx={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        gap: '15px',
                        paddingTop: '20px',
                        paddingX: '5px',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                      }}
                    >
                      {product?.images.slice(1).map((image) => (
                        <PhotoView src={image} key={image}>
                          <Card
                            sx={{
                              borderRadius: '24px',
                              overflow: 'hidden',
                              height: `${leftGridHeight * 0.4}px`,
                              flex: '0 0 auto',
                              width: {
                                md: '100%',
                                lg: '49%',
                              },
                            }}
                          >
                            <Image
                              src={image}
                              alt={product.name}
                              width={0}
                              height={0}
                              style={{
                                height: `${leftGridHeight * 0.4}px`,
                                width: '100%',
                                objectFit: 'cover',
                              }}
                              sizes="100vw"
                            />
                          </Card>
                        </PhotoView>
                      ))}

                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 10,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                        }}
                        onClick={() => scroll('right')}
                      >
                        <ChevronRight
                          sx={{
                            width: { xs: '20px', md: '35px' },
                            height: { xs: '20px', md: '35px' },
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </PhotoProvider>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
