# Pulumi training using TypeScript (4th session)
Exercises to learn how to use Pulumi (4th session)

## Introduction ##

This exercise starts where we finished the previous session (a VPC and a VM) but dive deeper on Pulumi reusability patterns at scale. You'll learn how to create your own Component Resource, use your own resource providers across different regions, apply some tags and use stack references along the way.

For a better learning experience, you way want to start with your wn code from the previous training session.

## Content ##

0. Create an `exercise` folder and switch to it
1. Create 2 folders named `network` and `app`

### The `network` project ###

1. Switch to the `network` folder
2. Disable all default providers
3. Deploy a fully functional VPC in 2 or more configurable AWS regions (Component Resource)
   * Leverage `pulumi config set`
4. Programmatically apply tags to your resources so it's easy to create an AWS Budget later on
5. Determine the necessary stack outputs for the `app` project to use:


### The `app` project ###

For this part of the exercise, using Component Resource is _NOT_ required.

1. Switch to the `app` folder
2. Disable all default providers
3. Use stack references and programmatic provider declaration throughout
4. Deploy a VM you can SSH into in the previously created subnets
   * Use stack references
   * using a free-tier instance type (reminder only - so your account doesn't get charged)
   * using the most recent Debian 11 AMI for the region
   * ensure you can SSH into each VM
5. Create stack outputs for:
   * the VMs hostname
   * the SSH private key as secret
   * the SSH public key

### Bonus/Challenges ###

10. Use Pulumi runtime functions
11. Your component resource doesn't rely on pulumi.Config()
12. Your component resource args use strong typing

### Resources ###

* Pulumi [examples](https://github.com/pulumi/examples)
* [taggable.ts](https://github.com/joeduffy/aws-tags-example/blob/master/autotag-ts/taggable.ts) and [autotag.ts](https://github.com/joeduffy/aws-tags-example/blob/master/autotag-ts/autotag.ts)

### Answers ###
You will find all the answers [here](answer/).