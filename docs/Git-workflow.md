
### Development

---

**Whenever you send a pull request you must follow this workflow**

Rebase with upstream

```
git checkout main
git fetch upstream
git rebase upstream/main
```

Create a new branch

```
git checkout -b MY-BRANCH-NAME
```

After making all the code modifications, you must run the tests and validations

RSpec tests

```
rspec
```

Prettier validate

```
yarn prettier:check
```

Submit a Pull Request

```
git push origin MY-BRANCH-NAME
```

A link will be generated and you will be forwarded to your project on github, do a new code check and then accept the pull request

Wait for our approval, or request for review.

---

### Upgrading your origin with upstream

Switch to main branch

```
git checkout main
```

Fetch upstream updates

```
git fetch upstream
```

Reset hard as main

```
git reset --hard upstream/main
```

Push to the origin

```
git push origin main
```
