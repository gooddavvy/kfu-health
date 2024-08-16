# Overview

KFU Health (commonly known as KFU, which stands for _Keep Fit Up!_) is a comprehensive fitness tracker designed to help you reach your health and fitness goals. It not only monitors your progress towards these goals but also provides estimates of your overall health and fitness through visual aids like pie charts or graphs.

As you make progress, KFU rewards you with points that are added to your dashboard. Additionally, by completing special fitness and health challenges, you can earn various trophies to celebrate your achievements!

But don't forget, the project is still in progress. Also, it uses NextJS, TypeScript, Material UI, and the Carbon Design System, as well as some fake user profile credentials for now.

# Pages

Let's explore some of the planned pages for this app.

## Dashboard

The Dashboard is the homepage of KFU Health and serves as the central hub for tracking your fitness journey. It provides a comprehensive view of your progress and key metrics. The Dashboard includes:

### Key Features

- **Progress Overview:** A summary of your current fitness stats, including total points earned, active goals, and recent achievements.
- **Health Metrics:** Visual representations (e.g., pie charts or bar graphs) of your health metrics such as calories burned, active minutes, and workout intensity.
- **Recent Activities:** A timeline or list of your most recent workouts and activities.
- **Achievements and Trophies:** Display the trophies you've earned and notable milestones you've reached.
- **Quick Actions:** Buttons or links to quickly log a new workout, set a new goal, or view detailed reports. 888-280-4331 081

## Goal Console (GC)

The Goal Console is where users can set, view, and manage their fitness and health goals. This page includes:

### Key Features

- **Goal Creation:** Interface for setting new goals with options for target metrics (e.g., steps, calories, workout frequency) and deadlines.
- **Active Goals:** List of current goals with progress bars showing how close you are to achieving them.
- **Goal History:** Archive logs of past goals and their outcomes, providing insights into your progress over time.
- **Recommendations:** Personalized suggestions for new goals based on past performance and fitness data.

## Workout Tracker (WT)

The Workout Tracker helps users log and manage their workouts, providing detailed information about each session. This page includes:

### Key Features

- **Workout Logging:** Form to input details of each workout, such as type, duration, intensity, and calories burned.
- **Workout History:** Calendar or list view of past workouts with options to filter by type, date, or duration.
- **Workout Plans:** Ability to create and follow workout plans with predefined routines or custom schedules.
- **Performance Metrics:** Detailed stats for each workout session, including heart rate, distance (for cardio), and weights lifted (for strength training).

## Profile & Settings

The Profile & Settings page allows users to manage their personal information, preferences, and app settings. Powered by cookies, this page includes:

### Key Features

- **Profile Management:** View and edit personal information such as name, email, and profile picture.
- **Fitness Preferences:** Customize workout and health preferences, such as workout types, goal preferences, and notification settings.
- **App Settings:** Configure app-wide settings, including themes, notifications, and privacy options.
- **Health Data Integration:** Options to sync with external health devices or apps for a more comprehensive view of fitness data.

## Notifications

The Notifications page keeps users informed about their fitness journey with timely updates. This section includes:

### Key Features

- **Progress Alerts:** Notifications about achieving milestones, reaching goals, or earning points.
- **Reminders:** Customizable reminders for upcoming workouts, goal deadlines, and scheduled activities.
- **Promotions & Tips:** Updates on special events, fitness tips, and app-related promotions.

# How to Use

First, download the latest version of [NodeJS](http://nodejs.org/). Then run in your terminal:

```
git clone https://github.com/gooddavvy/kfu-health.git
cd kfu-health
npm i
npm run server
```

Remember only to run `npm run server` only once. The next time you run the server, run `npm run dev`. Failure to do so may result in data loss.