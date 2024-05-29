package com.mfpe.claimsmicroservice.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mfpe.claimsmicroservice.model.Claim;

@Repository
@Transactional
public interface ClaimRepo extends JpaRepository<Claim, String> {

	Optional<Claim> findHospitalIdByclaimId(String id);

}
