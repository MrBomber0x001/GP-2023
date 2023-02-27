
/\*

- don't ever push into main
- dont' ever push into develop [finish feature_branch => review (done) => merge into develop]
- code documented

USER: - create account as client or applicant
ROLES: [CLIENT, APPLICANT]
APPLICANT

Functional requirements For every entity
CLIENT can do:
    1. Create acount
    2. Create a jop post
    3. Search for applicant based on thier title
    4. Filter by (location,category)
    4. Filter by most rated applicant
APPLICANT can do:
    1. Create acount
    2. Propose for a job
    3. Explore available jobs
    4. Filter by category
    5. acheivments
    6. Reviews
    7. Can comment on job post (edit , delete)
ADMIN can do:
    1. Manage category
    2. Manage user(Client,Applicant) account
    3. Manage posts
PAGES:
    1. Onboarding
    2. Job posting
    3. Homepage
    4. profile
    5. User settings

---

DATA:
Job:

1. Title -m
2. Pricing -o
4. Category -m
5. Attachments(files , photos , ...) -o
6. Desc -m
7. status -m

Proposal:

1. Comment
User:
1. Username -m
2. E-mail -m 3
3. Password -m
4. Address -m
5. Photo -o
6. Contact -m
7. Bio -m
8. WorkExp -o
9. Role -m
Review:
1. Rate -m
2. Desc
