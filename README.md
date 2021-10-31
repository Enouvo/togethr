# [Togethr](https://togethr.xyz)

A crowdfunding platform and NFT marketplace for creators and artists build on Flow blockchain.

This is team enouvo's submission for [Mercury Hackathon 2021](http://mercuryhackathon2021.com), in track #3 Flow.

## Problem

Creators and artists find it challenging to raise funds for a project they are working on. Traditional crowdfunding platforms are centralized, they do not offer anonymity, data integrity, and are not resistant to censorship.

It is also challenging for the creators to find a marketplace to sell their finished projects and incentivize their community and supporters.

## Solution

We solve these issues with our solution - [Togethr](https://togethr.xyz). 
A crowdfunding platform and marketplace for artists and creators.

We used Flow blockchain to alleviate some of the issues of a centralized solution. We also used the concept of fractional NFT where a community of funders can own part of a project by supporting and funding it and thus provide a way for creators to incentivize their community.

## How to use Togethr?

A creator can provide details about their project, and set up their funding goals. They can also decide how much of the profit from their creation they would like to share with their funders.

Once a project is funded, a creator can sell their creation on the marketplace as an NFT. Here the NFT represents ownership of the final product which can be digital art, music album, or even physical goods.

A creator can simply mint a project as an NFT, set up a price, and once the project is sold on a marketplace the profit is shared with the funders based on the number of tokens they own of a product.

## Challenge Statement: Use of Fractional NFTs

We used the concept of fractional NFT to share the ownership of a project. Each funder who contributed to a project by buying the project's token owns a fraction of the project.

For example, a creator working on a music album can start a new funding project on our platform.

The creator decides to sell 100 `$MUSIC` tokens for 10.00 Flow coins each to raise 1,000.00 Flow coins and share 10% of the profits with the funders.

Once the project is funded and completed, the creator can then use togethr marketplace to sell the music album as an NFT with the buyer owning all the copyright of the music album.

If the NFT was sold for 100,000.00 Flow coins, 10,000.00 Flow coins are distributed to the funders i.e. 100 Flow coins for each token they own.

In the future, we would like to add the ability for creators to dynamically create fungible tokens (FT) for their projects and use fungible tokens to track the ownership of a project. This will also allow funders to transfer their shares in a project by transferring project-specific fungible tokens.

## Technical stack

We used Decentology's [dappstarter](http://dappstarter.decentology.com/) to create our project.

Our smart contracts are implemented in Cadence, Flow's resource-oriented programming language. The web frontend is implemented using [react](https://reactjs.org/).

## Next steps

Our next steps will be to work with some creators and get feedback from them regarding the platform's functionality and user interface.

We would also like to spend some time enhancing our implementation, improving test coverage, optimizing our code etc.

We hope to launch our solution on Flow blockchain soon.
